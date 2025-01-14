/**
 * Unit tests for the action's main functionality, src/main.js
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const getPrId = (await import('../src/getPrId.js')).default

describe('getPrId', () => {
  it('searches pull requests for ', async () => {
    const mockPrs = [
      { number: 1, head: { ref: 'wrongBranch' }, base: { ref: 'main' } },
      { number: 2, head: { ref: 'ref' }, base: { ref: 'prod' } },
      { number: 3, head: { ref: 'elsewhere' }, base: { ref: 'main' } }
    ]
    const mocktocat = {
      rest: {
        pulls: {
          get: jest.fn().mockReturnValue({ data: [...mockPrs] })
        }
      }
    }
    const moctx = {
      repo: {
        owner: 'owner',
        repo: 'repo'
      },
      ref: 'ref'
    }
    const outputs = await getPrId({
      token: mocktocat,
      context: moctx
    })
    expect(mocktocat.rest.pulls.get).toHaveBeenCalled()
    expect(outputs).toEqual(
      expect.objectContaining({
        id: 2,
        branch: 'ref',
        base: 'prod'
      })
    )
  })
})
