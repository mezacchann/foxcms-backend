const ADD_PROJECT = `
mutation addProject($name: String!, $stage: String!) {
    addProject(input: {name: $name, stage: $stage}) {
        clientMutationId
    }
}`

const DEPLOY = `
mutation deploy($projectName: String!, $stage: String!, $types: String!, $secrets: [String!]) {
  deploy(
    input: {
      name: $projectName
      stage: $stage
      types: $types
      secrets: $secrets
    }
  ) {
    errors {
      description
    }
  }
}`
export { ADD_PROJECT, DEPLOY }
