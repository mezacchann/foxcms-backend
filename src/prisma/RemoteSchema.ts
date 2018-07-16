import { GraphQLSchema } from 'graphql';

export class RemoteSchema {
  schemaDefinition: string;
  executableSchema: GraphQLSchema;

  constructor(schemaDefinition: string, executableSchema: GraphQLSchema) {
    this.schemaDefinition = schemaDefinition;
    this.executableSchema = executableSchema;
  }
}
