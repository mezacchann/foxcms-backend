const ADD_PROJECT = `
 mutation addProject($name: String!, $stage: String!) {
    addProject(input: {name: $name, stage: $stage}) {
        clientMutationId
    }
  }`

export { ADD_PROJECT }
