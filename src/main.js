import * as core from '@actions/core'
import { wait } from './wait.js'

/**
 * The main function for the action.
 *
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run() {
  const ms = core.getInput('milliseconds')
  core.debug(JSON.stringify(github))
  // Debug logs are only output if the `ACTIONS_STEP_DEBUG` secret is true
  core.debug(`Waiting ${ms} milliseconds ...`)

  // Log the current timestamp, wait, then log the new timestamp
  core.debug(new Date().toTimeString())
  await wait(parseInt(ms, 10))
  core.debug(new Date().toTimeString())

  return {
    time: new Date().toTimeString()
  }
}
