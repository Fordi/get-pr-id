import * as core from '@actions/core';
const { setFailed, setOutput, getInput } = core;

const inputProxy = (schema = {}) => new Proxy(core, {
  get: (target, prop, self) => {
    const strValue = target.getInput(prop);
    const { required, parse } = schema[prop] ?? {};
    if (required && strValue === undefined) {
      throw new Error(`Input ${prop} is required, but not present.`);
    }
    if (strValue !== undefined && !!parse) {
      const value = parse(strValue);
      if (value instanceof Error) {
        throw value;
      }
      if (typeof value === 'number' && isNaN(value)) {
        throw new Error(`${prop} is not a number`);
      }
      return value;
    }
     
    return strValue;
  },
});

export async function executor(promisor) {
  try {
    const outputs = await promisor(inputProxy(promisor.schema))
    if (outputs === undefined || outputs === true) {
      return;
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
