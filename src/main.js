import * as core from '@actions/core'
import { getOctokit } from '@actions/github'
import { wait } from './wait.js'

/**
 * The main function for the action.
 *
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export const run = Object.assign(async ({ token }) => {
  const pulls = await token.rest.pulls.get({
    owner: 'fordi',
    repo: 'get-pr-id',
  });
  console.log(pulls);
  return {}
}, {
  schema: {
    token: {
      required: true,
      parse: (token) => getOctokit(token)
    },
  },
});