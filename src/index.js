import { setFailed, setOutput } from '@actions/core'
import { run } from './main.js'

run().then(
  (outputs) => {
    if (outputs === undefined || outputs === true) {
      return
    }
    if (typeof outputs === 'object' && !Array.isArray(outputs)) {
      for (const [key, value] of Object.entries(outputs)) {
        setOutput(key, value)
      }
    } else {
      setOutput('value', outputs)
    }
  },
  (error) => setFailed(error.message)
)
