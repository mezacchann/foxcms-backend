const ADD_PROJECT = `
mutation addProject($name: String!, $stage: String!) {
    addProject(input: {name: $name, stage: $stage}) {
        clientMutationId
    }
}`

const DEPLOY = `
mutation deploy($projectName: String!, $stage: String!, $types: String!) {
  deploy(
    input: {
      name: $projectName
      stage: $stage
      types: $types
    }
  ) {
    errors {
      description
    }
  }
}`
export { ADD_PROJECT, DEPLOY }
