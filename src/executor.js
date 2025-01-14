import { setFailed, setOutput } from '@actions/core'

export async function executor(promisor) {
  try {
    const outputs = await promisor()
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
  } catch (error) {
    setFailed(error.message)
  }
}
