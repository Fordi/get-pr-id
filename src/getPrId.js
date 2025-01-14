import { getOctokit } from '@actions/github'

export default async function getPrId({ token: { rest }, context }) {
  const pull = (await rest.pulls.get(context.repo)).data.find(
    ({ head: { ref } }) => ref === context.ref
  )
  if (!pull) {
    return { id: undefined, branch: undefined, base: undefined }
  }
  return {
    id: pull.number,
    branch: pull.head.ref,
    base: pull.base.ref
  }
}

getPrId.schema = {
  token: {
    required: true,
    parse: (token) => getOctokit(token)
  }
}
