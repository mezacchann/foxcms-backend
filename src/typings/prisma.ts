import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    projects: <T = Project[]>(args: { where?: ProjectWhereInput, orderBy?: ProjectOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    contentTypes: <T = ContentType[]>(args: { where?: ContentTypeWhereInput, orderBy?: ContentTypeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    contentTypeFields: <T = ContentTypeField[]>(args: { where?: ContentTypeFieldWhereInput, orderBy?: ContentTypeFieldOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    files: <T = File[]>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    project: <T = Project | null>(args: { where: ProjectWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    contentType: <T = ContentType | null>(args: { where: ContentTypeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    contentTypeField: <T = ContentTypeField | null>(args: { where: ContentTypeFieldWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    file: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    projectsConnection: <T = ProjectConnection>(args: { where?: ProjectWhereInput, orderBy?: ProjectOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    contentTypesConnection: <T = ContentTypeConnection>(args: { where?: ContentTypeWhereInput, orderBy?: ContentTypeOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    contentTypeFieldsConnection: <T = ContentTypeFieldConnection>(args: { where?: ContentTypeFieldWhereInput, orderBy?: ContentTypeFieldOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    filesConnection: <T = FileConnection>(args: { where?: FileWhereInput, orderBy?: FileOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createProject: <T = Project>(args: { data: ProjectCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createContentType: <T = ContentType>(args: { data: ContentTypeCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createContentTypeField: <T = ContentTypeField>(args: { data: ContentTypeFieldCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createFile: <T = File>(args: { data: FileCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateProject: <T = Project | null>(args: { data: ProjectUpdateInput, where: ProjectWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateContentType: <T = ContentType | null>(args: { data: ContentTypeUpdateInput, where: ContentTypeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateContentTypeField: <T = ContentTypeField | null>(args: { data: ContentTypeFieldUpdateInput, where: ContentTypeFieldWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateFile: <T = File | null>(args: { data: FileUpdateInput, where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteProject: <T = Project | null>(args: { where: ProjectWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteContentType: <T = ContentType | null>(args: { where: ContentTypeWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteContentTypeField: <T = ContentTypeField | null>(args: { where: ContentTypeFieldWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteFile: <T = File | null>(args: { where: FileWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertProject: <T = Project>(args: { where: ProjectWhereUniqueInput, create: ProjectCreateInput, update: ProjectUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertContentType: <T = ContentType>(args: { where: ContentTypeWhereUniqueInput, create: ContentTypeCreateInput, update: ContentTypeUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertContentTypeField: <T = ContentTypeField>(args: { where: ContentTypeFieldWhereUniqueInput, create: ContentTypeFieldCreateInput, update: ContentTypeFieldUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertFile: <T = File>(args: { where: FileWhereUniqueInput, create: FileCreateInput, update: FileUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyProjects: <T = BatchPayload>(args: { data: ProjectUpdateInput, where?: ProjectWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyContentTypes: <T = BatchPayload>(args: { data: ContentTypeUpdateInput, where?: ContentTypeWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyContentTypeFields: <T = BatchPayload>(args: { data: ContentTypeFieldUpdateInput, where?: ContentTypeFieldWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyFiles: <T = BatchPayload>(args: { data: FileUpdateInput, where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyProjects: <T = BatchPayload>(args: { where?: ProjectWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyContentTypes: <T = BatchPayload>(args: { where?: ContentTypeWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyContentTypeFields: <T = BatchPayload>(args: { where?: ContentTypeFieldWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyFiles: <T = BatchPayload>(args: { where?: FileWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    project: <T = ProjectSubscriptionPayload | null>(args: { where?: ProjectSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    contentType: <T = ContentTypeSubscriptionPayload | null>(args: { where?: ContentTypeSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    contentTypeField: <T = ContentTypeFieldSubscriptionPayload | null>(args: { where?: ContentTypeFieldSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    file: <T = FileSubscriptionPayload | null>(args: { where?: FileSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  User: (where?: UserWhereInput) => Promise<boolean>
  Project: (where?: ProjectWhereInput) => Promise<boolean>
  ContentType: (where?: ContentTypeWhereInput) => Promise<boolean>
  ContentTypeField: (where?: ContentTypeFieldWhereInput) => Promise<boolean>
  File: (where?: FileWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `type AggregateContentType {
  count: Int!
}

type AggregateContentTypeField {
  count: Int!
}

type AggregateFile {
  count: Int!
}

type AggregateProject {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type ContentType implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  project(where: ProjectWhereInput): Project!
  name: String!
  description: String
  fields(where: ContentTypeFieldWhereInput, orderBy: ContentTypeFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContentTypeField!]
}

"""A connection to a list of items."""
type ContentTypeConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ContentTypeEdge]!
  aggregate: AggregateContentType!
}

input ContentTypeCreateInput {
  name: String!
  description: String
  project: ProjectCreateOneWithoutTypesInput!
  fields: ContentTypeFieldCreateManyWithoutContentTypeInput
}

input ContentTypeCreateManyWithoutProjectInput {
  create: [ContentTypeCreateWithoutProjectInput!]
  connect: [ContentTypeWhereUniqueInput!]
}

input ContentTypeCreateOneWithoutFieldsInput {
  create: ContentTypeCreateWithoutFieldsInput
  connect: ContentTypeWhereUniqueInput
}

input ContentTypeCreateWithoutFieldsInput {
  name: String!
  description: String
  project: ProjectCreateOneWithoutTypesInput!
}

input ContentTypeCreateWithoutProjectInput {
  name: String!
  description: String
  fields: ContentTypeFieldCreateManyWithoutContentTypeInput
}

"""An edge in a connection."""
type ContentTypeEdge {
  """The item at the end of the edge."""
  node: ContentType!

  """A cursor for use in pagination."""
  cursor: String!
}

type ContentTypeField implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  contentType(where: ContentTypeWhereInput): ContentType!
  name: String!
  type: ContentTypeFieldType!
  isRequired: Boolean!
}

"""A connection to a list of items."""
type ContentTypeFieldConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ContentTypeFieldEdge]!
  aggregate: AggregateContentTypeField!
}

input ContentTypeFieldCreateInput {
  name: String!
  type: ContentTypeFieldType!
  isRequired: Boolean!
  contentType: ContentTypeCreateOneWithoutFieldsInput!
}

input ContentTypeFieldCreateManyWithoutContentTypeInput {
  create: [ContentTypeFieldCreateWithoutContentTypeInput!]
  connect: [ContentTypeFieldWhereUniqueInput!]
}

input ContentTypeFieldCreateWithoutContentTypeInput {
  name: String!
  type: ContentTypeFieldType!
  isRequired: Boolean!
}

"""An edge in a connection."""
type ContentTypeFieldEdge {
  """The item at the end of the edge."""
  node: ContentTypeField!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ContentTypeFieldOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  type_ASC
  type_DESC
  isRequired_ASC
  isRequired_DESC
}

type ContentTypeFieldPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  type: ContentTypeFieldType!
  isRequired: Boolean!
}

type ContentTypeFieldSubscriptionPayload {
  mutation: MutationType!
  node: ContentTypeField
  updatedFields: [String!]
  previousValues: ContentTypeFieldPreviousValues
}

input ContentTypeFieldSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ContentTypeFieldSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ContentTypeFieldSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ContentTypeFieldSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ContentTypeFieldWhereInput
}

enum ContentTypeFieldType {
  String
  Text
  Int
  Float
  Checkbox
  Date
  Json
  Image
  File
}

input ContentTypeFieldUpdateInput {
  name: String
  type: ContentTypeFieldType
  isRequired: Boolean
  contentType: ContentTypeUpdateOneWithoutFieldsInput
}

input ContentTypeFieldUpdateManyWithoutContentTypeInput {
  create: [ContentTypeFieldCreateWithoutContentTypeInput!]
  connect: [ContentTypeFieldWhereUniqueInput!]
  disconnect: [ContentTypeFieldWhereUniqueInput!]
  delete: [ContentTypeFieldWhereUniqueInput!]
  update: [ContentTypeFieldUpdateWithWhereUniqueWithoutContentTypeInput!]
  upsert: [ContentTypeFieldUpsertWithWhereUniqueWithoutContentTypeInput!]
}

input ContentTypeFieldUpdateWithoutContentTypeDataInput {
  name: String
  type: ContentTypeFieldType
  isRequired: Boolean
}

input ContentTypeFieldUpdateWithWhereUniqueWithoutContentTypeInput {
  where: ContentTypeFieldWhereUniqueInput!
  data: ContentTypeFieldUpdateWithoutContentTypeDataInput!
}

input ContentTypeFieldUpsertWithWhereUniqueWithoutContentTypeInput {
  where: ContentTypeFieldWhereUniqueInput!
  update: ContentTypeFieldUpdateWithoutContentTypeDataInput!
  create: ContentTypeFieldCreateWithoutContentTypeInput!
}

input ContentTypeFieldWhereInput {
  """Logical AND on all given filters."""
  AND: [ContentTypeFieldWhereInput!]

  """Logical OR on all given filters."""
  OR: [ContentTypeFieldWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ContentTypeFieldWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  type: ContentTypeFieldType

  """All values that are not equal to given value."""
  type_not: ContentTypeFieldType

  """All values that are contained in given list."""
  type_in: [ContentTypeFieldType!]

  """All values that are not contained in given list."""
  type_not_in: [ContentTypeFieldType!]
  isRequired: Boolean

  """All values that are not equal to given value."""
  isRequired_not: Boolean
  contentType: ContentTypeWhereInput
}

input ContentTypeFieldWhereUniqueInput {
  id: ID
}

enum ContentTypeOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  name_ASC
  name_DESC
  description_ASC
  description_DESC
}

type ContentTypePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  name: String!
  description: String
}

type ContentTypeSubscriptionPayload {
  mutation: MutationType!
  node: ContentType
  updatedFields: [String!]
  previousValues: ContentTypePreviousValues
}

input ContentTypeSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ContentTypeSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ContentTypeSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ContentTypeSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ContentTypeWhereInput
}

input ContentTypeUpdateInput {
  name: String
  description: String
  project: ProjectUpdateOneWithoutTypesInput
  fields: ContentTypeFieldUpdateManyWithoutContentTypeInput
}

input ContentTypeUpdateManyWithoutProjectInput {
  create: [ContentTypeCreateWithoutProjectInput!]
  connect: [ContentTypeWhereUniqueInput!]
  disconnect: [ContentTypeWhereUniqueInput!]
  delete: [ContentTypeWhereUniqueInput!]
  update: [ContentTypeUpdateWithWhereUniqueWithoutProjectInput!]
  upsert: [ContentTypeUpsertWithWhereUniqueWithoutProjectInput!]
}

input ContentTypeUpdateOneWithoutFieldsInput {
  create: ContentTypeCreateWithoutFieldsInput
  connect: ContentTypeWhereUniqueInput
  delete: Boolean
  update: ContentTypeUpdateWithoutFieldsDataInput
  upsert: ContentTypeUpsertWithoutFieldsInput
}

input ContentTypeUpdateWithoutFieldsDataInput {
  name: String
  description: String
  project: ProjectUpdateOneWithoutTypesInput
}

input ContentTypeUpdateWithoutProjectDataInput {
  name: String
  description: String
  fields: ContentTypeFieldUpdateManyWithoutContentTypeInput
}

input ContentTypeUpdateWithWhereUniqueWithoutProjectInput {
  where: ContentTypeWhereUniqueInput!
  data: ContentTypeUpdateWithoutProjectDataInput!
}

input ContentTypeUpsertWithoutFieldsInput {
  update: ContentTypeUpdateWithoutFieldsDataInput!
  create: ContentTypeCreateWithoutFieldsInput!
}

input ContentTypeUpsertWithWhereUniqueWithoutProjectInput {
  where: ContentTypeWhereUniqueInput!
  update: ContentTypeUpdateWithoutProjectDataInput!
  create: ContentTypeCreateWithoutProjectInput!
}

input ContentTypeWhereInput {
  """Logical AND on all given filters."""
  AND: [ContentTypeWhereInput!]

  """Logical OR on all given filters."""
  OR: [ContentTypeWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ContentTypeWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  description: String

  """All values that are not equal to given value."""
  description_not: String

  """All values that are contained in given list."""
  description_in: [String!]

  """All values that are not contained in given list."""
  description_not_in: [String!]

  """All values less than the given value."""
  description_lt: String

  """All values less than or equal the given value."""
  description_lte: String

  """All values greater than the given value."""
  description_gt: String

  """All values greater than or equal the given value."""
  description_gte: String

  """All values containing the given string."""
  description_contains: String

  """All values not containing the given string."""
  description_not_contains: String

  """All values starting with the given string."""
  description_starts_with: String

  """All values not starting with the given string."""
  description_not_starts_with: String

  """All values ending with the given string."""
  description_ends_with: String

  """All values not ending with the given string."""
  description_not_ends_with: String
  project: ProjectWhereInput
  fields_every: ContentTypeFieldWhereInput
  fields_some: ContentTypeFieldWhereInput
  fields_none: ContentTypeFieldWhereInput
}

input ContentTypeWhereUniqueInput {
  id: ID
}

scalar DateTime

type File implements Node {
  id: ID!
  project(where: ProjectWhereInput): Project!
  createdAt: DateTime!
  updatedAt: DateTime!
  originalName: String!
  fileName: String!
  size: Int!
  mimeType: String!
  url: String!
}

"""A connection to a list of items."""
type FileConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [FileEdge]!
  aggregate: AggregateFile!
}

input FileCreateInput {
  originalName: String!
  fileName: String!
  size: Int!
  mimeType: String!
  url: String!
  project: ProjectCreateOneWithoutFilesInput!
}

input FileCreateManyWithoutProjectInput {
  create: [FileCreateWithoutProjectInput!]
  connect: [FileWhereUniqueInput!]
}

input FileCreateWithoutProjectInput {
  originalName: String!
  fileName: String!
  size: Int!
  mimeType: String!
  url: String!
}

"""An edge in a connection."""
type FileEdge {
  """The item at the end of the edge."""
  node: File!

  """A cursor for use in pagination."""
  cursor: String!
}

enum FileOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  originalName_ASC
  originalName_DESC
  fileName_ASC
  fileName_DESC
  size_ASC
  size_DESC
  mimeType_ASC
  mimeType_DESC
  url_ASC
  url_DESC
}

type FilePreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  originalName: String!
  fileName: String!
  size: Int!
  mimeType: String!
  url: String!
}

type FileSubscriptionPayload {
  mutation: MutationType!
  node: File
  updatedFields: [String!]
  previousValues: FilePreviousValues
}

input FileSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [FileSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: FileWhereInput
}

input FileUpdateInput {
  originalName: String
  fileName: String
  size: Int
  mimeType: String
  url: String
  project: ProjectUpdateOneWithoutFilesInput
}

input FileUpdateManyWithoutProjectInput {
  create: [FileCreateWithoutProjectInput!]
  connect: [FileWhereUniqueInput!]
  disconnect: [FileWhereUniqueInput!]
  delete: [FileWhereUniqueInput!]
  update: [FileUpdateWithWhereUniqueWithoutProjectInput!]
  upsert: [FileUpsertWithWhereUniqueWithoutProjectInput!]
}

input FileUpdateWithoutProjectDataInput {
  originalName: String
  fileName: String
  size: Int
  mimeType: String
  url: String
}

input FileUpdateWithWhereUniqueWithoutProjectInput {
  where: FileWhereUniqueInput!
  data: FileUpdateWithoutProjectDataInput!
}

input FileUpsertWithWhereUniqueWithoutProjectInput {
  where: FileWhereUniqueInput!
  update: FileUpdateWithoutProjectDataInput!
  create: FileCreateWithoutProjectInput!
}

input FileWhereInput {
  """Logical AND on all given filters."""
  AND: [FileWhereInput!]

  """Logical OR on all given filters."""
  OR: [FileWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [FileWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  originalName: String

  """All values that are not equal to given value."""
  originalName_not: String

  """All values that are contained in given list."""
  originalName_in: [String!]

  """All values that are not contained in given list."""
  originalName_not_in: [String!]

  """All values less than the given value."""
  originalName_lt: String

  """All values less than or equal the given value."""
  originalName_lte: String

  """All values greater than the given value."""
  originalName_gt: String

  """All values greater than or equal the given value."""
  originalName_gte: String

  """All values containing the given string."""
  originalName_contains: String

  """All values not containing the given string."""
  originalName_not_contains: String

  """All values starting with the given string."""
  originalName_starts_with: String

  """All values not starting with the given string."""
  originalName_not_starts_with: String

  """All values ending with the given string."""
  originalName_ends_with: String

  """All values not ending with the given string."""
  originalName_not_ends_with: String
  fileName: String

  """All values that are not equal to given value."""
  fileName_not: String

  """All values that are contained in given list."""
  fileName_in: [String!]

  """All values that are not contained in given list."""
  fileName_not_in: [String!]

  """All values less than the given value."""
  fileName_lt: String

  """All values less than or equal the given value."""
  fileName_lte: String

  """All values greater than the given value."""
  fileName_gt: String

  """All values greater than or equal the given value."""
  fileName_gte: String

  """All values containing the given string."""
  fileName_contains: String

  """All values not containing the given string."""
  fileName_not_contains: String

  """All values starting with the given string."""
  fileName_starts_with: String

  """All values not starting with the given string."""
  fileName_not_starts_with: String

  """All values ending with the given string."""
  fileName_ends_with: String

  """All values not ending with the given string."""
  fileName_not_ends_with: String
  size: Int

  """All values that are not equal to given value."""
  size_not: Int

  """All values that are contained in given list."""
  size_in: [Int!]

  """All values that are not contained in given list."""
  size_not_in: [Int!]

  """All values less than the given value."""
  size_lt: Int

  """All values less than or equal the given value."""
  size_lte: Int

  """All values greater than the given value."""
  size_gt: Int

  """All values greater than or equal the given value."""
  size_gte: Int
  mimeType: String

  """All values that are not equal to given value."""
  mimeType_not: String

  """All values that are contained in given list."""
  mimeType_in: [String!]

  """All values that are not contained in given list."""
  mimeType_not_in: [String!]

  """All values less than the given value."""
  mimeType_lt: String

  """All values less than or equal the given value."""
  mimeType_lte: String

  """All values greater than the given value."""
  mimeType_gt: String

  """All values greater than or equal the given value."""
  mimeType_gte: String

  """All values containing the given string."""
  mimeType_contains: String

  """All values not containing the given string."""
  mimeType_not_contains: String

  """All values starting with the given string."""
  mimeType_starts_with: String

  """All values not starting with the given string."""
  mimeType_not_starts_with: String

  """All values ending with the given string."""
  mimeType_ends_with: String

  """All values not ending with the given string."""
  mimeType_not_ends_with: String
  url: String

  """All values that are not equal to given value."""
  url_not: String

  """All values that are contained in given list."""
  url_in: [String!]

  """All values that are not contained in given list."""
  url_not_in: [String!]

  """All values less than the given value."""
  url_lt: String

  """All values less than or equal the given value."""
  url_lte: String

  """All values greater than the given value."""
  url_gt: String

  """All values greater than or equal the given value."""
  url_gte: String

  """All values containing the given string."""
  url_contains: String

  """All values not containing the given string."""
  url_not_contains: String

  """All values starting with the given string."""
  url_starts_with: String

  """All values not starting with the given string."""
  url_not_starts_with: String

  """All values ending with the given string."""
  url_ends_with: String

  """All values not ending with the given string."""
  url_not_ends_with: String
  project: ProjectWhereInput
}

input FileWhereUniqueInput {
  id: ID
  url: String
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createUser(data: UserCreateInput!): User!
  createProject(data: ProjectCreateInput!): Project!
  createContentType(data: ContentTypeCreateInput!): ContentType!
  createContentTypeField(data: ContentTypeFieldCreateInput!): ContentTypeField!
  createFile(data: FileCreateInput!): File!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateProject(data: ProjectUpdateInput!, where: ProjectWhereUniqueInput!): Project
  updateContentType(data: ContentTypeUpdateInput!, where: ContentTypeWhereUniqueInput!): ContentType
  updateContentTypeField(data: ContentTypeFieldUpdateInput!, where: ContentTypeFieldWhereUniqueInput!): ContentTypeField
  updateFile(data: FileUpdateInput!, where: FileWhereUniqueInput!): File
  deleteUser(where: UserWhereUniqueInput!): User
  deleteProject(where: ProjectWhereUniqueInput!): Project
  deleteContentType(where: ContentTypeWhereUniqueInput!): ContentType
  deleteContentTypeField(where: ContentTypeFieldWhereUniqueInput!): ContentTypeField
  deleteFile(where: FileWhereUniqueInput!): File
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertProject(where: ProjectWhereUniqueInput!, create: ProjectCreateInput!, update: ProjectUpdateInput!): Project!
  upsertContentType(where: ContentTypeWhereUniqueInput!, create: ContentTypeCreateInput!, update: ContentTypeUpdateInput!): ContentType!
  upsertContentTypeField(where: ContentTypeFieldWhereUniqueInput!, create: ContentTypeFieldCreateInput!, update: ContentTypeFieldUpdateInput!): ContentTypeField!
  upsertFile(where: FileWhereUniqueInput!, create: FileCreateInput!, update: FileUpdateInput!): File!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyProjects(data: ProjectUpdateInput!, where: ProjectWhereInput): BatchPayload!
  updateManyContentTypes(data: ContentTypeUpdateInput!, where: ContentTypeWhereInput): BatchPayload!
  updateManyContentTypeFields(data: ContentTypeFieldUpdateInput!, where: ContentTypeFieldWhereInput): BatchPayload!
  updateManyFiles(data: FileUpdateInput!, where: FileWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyProjects(where: ProjectWhereInput): BatchPayload!
  deleteManyContentTypes(where: ContentTypeWhereInput): BatchPayload!
  deleteManyContentTypeFields(where: ContentTypeFieldWhereInput): BatchPayload!
  deleteManyFiles(where: FileWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Project implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  user(where: UserWhereInput): User!
  types(where: ContentTypeWhereInput, orderBy: ContentTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContentType!]
  providedName: String!
  generatedName: String!
  stage: String!
  secret: String
  datamodel: String!
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File!]
}

"""A connection to a list of items."""
type ProjectConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ProjectEdge]!
  aggregate: AggregateProject!
}

input ProjectCreateInput {
  providedName: String!
  generatedName: String!
  stage: String!
  secret: String
  datamodel: String
  user: UserCreateOneWithoutProjectsInput!
  types: ContentTypeCreateManyWithoutProjectInput
  files: FileCreateManyWithoutProjectInput
}

input ProjectCreateManyWithoutUserInput {
  create: [ProjectCreateWithoutUserInput!]
  connect: [ProjectWhereUniqueInput!]
}

input ProjectCreateOneWithoutFilesInput {
  create: ProjectCreateWithoutFilesInput
  connect: ProjectWhereUniqueInput
}

input ProjectCreateOneWithoutTypesInput {
  create: ProjectCreateWithoutTypesInput
  connect: ProjectWhereUniqueInput
}

input ProjectCreateWithoutFilesInput {
  providedName: String!
  generatedName: String!
  stage: String!
  secret: String
  datamodel: String
  user: UserCreateOneWithoutProjectsInput!
  types: ContentTypeCreateManyWithoutProjectInput
}

input ProjectCreateWithoutTypesInput {
  providedName: String!
  generatedName: String!
  stage: String!
  secret: String
  datamodel: String
  user: UserCreateOneWithoutProjectsInput!
  files: FileCreateManyWithoutProjectInput
}

input ProjectCreateWithoutUserInput {
  providedName: String!
  generatedName: String!
  stage: String!
  secret: String
  datamodel: String
  types: ContentTypeCreateManyWithoutProjectInput
  files: FileCreateManyWithoutProjectInput
}

"""An edge in a connection."""
type ProjectEdge {
  """The item at the end of the edge."""
  node: Project!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ProjectOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  providedName_ASC
  providedName_DESC
  generatedName_ASC
  generatedName_DESC
  stage_ASC
  stage_DESC
  secret_ASC
  secret_DESC
  datamodel_ASC
  datamodel_DESC
}

type ProjectPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  providedName: String!
  generatedName: String!
  stage: String!
  secret: String
  datamodel: String!
}

type ProjectSubscriptionPayload {
  mutation: MutationType!
  node: Project
  updatedFields: [String!]
  previousValues: ProjectPreviousValues
}

input ProjectSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ProjectSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ProjectSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ProjectSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ProjectWhereInput
}

input ProjectUpdateInput {
  providedName: String
  generatedName: String
  stage: String
  secret: String
  datamodel: String
  user: UserUpdateOneWithoutProjectsInput
  types: ContentTypeUpdateManyWithoutProjectInput
  files: FileUpdateManyWithoutProjectInput
}

input ProjectUpdateManyWithoutUserInput {
  create: [ProjectCreateWithoutUserInput!]
  connect: [ProjectWhereUniqueInput!]
  disconnect: [ProjectWhereUniqueInput!]
  delete: [ProjectWhereUniqueInput!]
  update: [ProjectUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [ProjectUpsertWithWhereUniqueWithoutUserInput!]
}

input ProjectUpdateOneWithoutFilesInput {
  create: ProjectCreateWithoutFilesInput
  connect: ProjectWhereUniqueInput
  delete: Boolean
  update: ProjectUpdateWithoutFilesDataInput
  upsert: ProjectUpsertWithoutFilesInput
}

input ProjectUpdateOneWithoutTypesInput {
  create: ProjectCreateWithoutTypesInput
  connect: ProjectWhereUniqueInput
  delete: Boolean
  update: ProjectUpdateWithoutTypesDataInput
  upsert: ProjectUpsertWithoutTypesInput
}

input ProjectUpdateWithoutFilesDataInput {
  providedName: String
  generatedName: String
  stage: String
  secret: String
  datamodel: String
  user: UserUpdateOneWithoutProjectsInput
  types: ContentTypeUpdateManyWithoutProjectInput
}

input ProjectUpdateWithoutTypesDataInput {
  providedName: String
  generatedName: String
  stage: String
  secret: String
  datamodel: String
  user: UserUpdateOneWithoutProjectsInput
  files: FileUpdateManyWithoutProjectInput
}

input ProjectUpdateWithoutUserDataInput {
  providedName: String
  generatedName: String
  stage: String
  secret: String
  datamodel: String
  types: ContentTypeUpdateManyWithoutProjectInput
  files: FileUpdateManyWithoutProjectInput
}

input ProjectUpdateWithWhereUniqueWithoutUserInput {
  where: ProjectWhereUniqueInput!
  data: ProjectUpdateWithoutUserDataInput!
}

input ProjectUpsertWithoutFilesInput {
  update: ProjectUpdateWithoutFilesDataInput!
  create: ProjectCreateWithoutFilesInput!
}

input ProjectUpsertWithoutTypesInput {
  update: ProjectUpdateWithoutTypesDataInput!
  create: ProjectCreateWithoutTypesInput!
}

input ProjectUpsertWithWhereUniqueWithoutUserInput {
  where: ProjectWhereUniqueInput!
  update: ProjectUpdateWithoutUserDataInput!
  create: ProjectCreateWithoutUserInput!
}

input ProjectWhereInput {
  """Logical AND on all given filters."""
  AND: [ProjectWhereInput!]

  """Logical OR on all given filters."""
  OR: [ProjectWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ProjectWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  providedName: String

  """All values that are not equal to given value."""
  providedName_not: String

  """All values that are contained in given list."""
  providedName_in: [String!]

  """All values that are not contained in given list."""
  providedName_not_in: [String!]

  """All values less than the given value."""
  providedName_lt: String

  """All values less than or equal the given value."""
  providedName_lte: String

  """All values greater than the given value."""
  providedName_gt: String

  """All values greater than or equal the given value."""
  providedName_gte: String

  """All values containing the given string."""
  providedName_contains: String

  """All values not containing the given string."""
  providedName_not_contains: String

  """All values starting with the given string."""
  providedName_starts_with: String

  """All values not starting with the given string."""
  providedName_not_starts_with: String

  """All values ending with the given string."""
  providedName_ends_with: String

  """All values not ending with the given string."""
  providedName_not_ends_with: String
  generatedName: String

  """All values that are not equal to given value."""
  generatedName_not: String

  """All values that are contained in given list."""
  generatedName_in: [String!]

  """All values that are not contained in given list."""
  generatedName_not_in: [String!]

  """All values less than the given value."""
  generatedName_lt: String

  """All values less than or equal the given value."""
  generatedName_lte: String

  """All values greater than the given value."""
  generatedName_gt: String

  """All values greater than or equal the given value."""
  generatedName_gte: String

  """All values containing the given string."""
  generatedName_contains: String

  """All values not containing the given string."""
  generatedName_not_contains: String

  """All values starting with the given string."""
  generatedName_starts_with: String

  """All values not starting with the given string."""
  generatedName_not_starts_with: String

  """All values ending with the given string."""
  generatedName_ends_with: String

  """All values not ending with the given string."""
  generatedName_not_ends_with: String
  stage: String

  """All values that are not equal to given value."""
  stage_not: String

  """All values that are contained in given list."""
  stage_in: [String!]

  """All values that are not contained in given list."""
  stage_not_in: [String!]

  """All values less than the given value."""
  stage_lt: String

  """All values less than or equal the given value."""
  stage_lte: String

  """All values greater than the given value."""
  stage_gt: String

  """All values greater than or equal the given value."""
  stage_gte: String

  """All values containing the given string."""
  stage_contains: String

  """All values not containing the given string."""
  stage_not_contains: String

  """All values starting with the given string."""
  stage_starts_with: String

  """All values not starting with the given string."""
  stage_not_starts_with: String

  """All values ending with the given string."""
  stage_ends_with: String

  """All values not ending with the given string."""
  stage_not_ends_with: String
  secret: String

  """All values that are not equal to given value."""
  secret_not: String

  """All values that are contained in given list."""
  secret_in: [String!]

  """All values that are not contained in given list."""
  secret_not_in: [String!]

  """All values less than the given value."""
  secret_lt: String

  """All values less than or equal the given value."""
  secret_lte: String

  """All values greater than the given value."""
  secret_gt: String

  """All values greater than or equal the given value."""
  secret_gte: String

  """All values containing the given string."""
  secret_contains: String

  """All values not containing the given string."""
  secret_not_contains: String

  """All values starting with the given string."""
  secret_starts_with: String

  """All values not starting with the given string."""
  secret_not_starts_with: String

  """All values ending with the given string."""
  secret_ends_with: String

  """All values not ending with the given string."""
  secret_not_ends_with: String
  datamodel: String

  """All values that are not equal to given value."""
  datamodel_not: String

  """All values that are contained in given list."""
  datamodel_in: [String!]

  """All values that are not contained in given list."""
  datamodel_not_in: [String!]

  """All values less than the given value."""
  datamodel_lt: String

  """All values less than or equal the given value."""
  datamodel_lte: String

  """All values greater than the given value."""
  datamodel_gt: String

  """All values greater than or equal the given value."""
  datamodel_gte: String

  """All values containing the given string."""
  datamodel_contains: String

  """All values not containing the given string."""
  datamodel_not_contains: String

  """All values starting with the given string."""
  datamodel_starts_with: String

  """All values not starting with the given string."""
  datamodel_not_starts_with: String

  """All values ending with the given string."""
  datamodel_ends_with: String

  """All values not ending with the given string."""
  datamodel_not_ends_with: String
  user: UserWhereInput
  types_every: ContentTypeWhereInput
  types_some: ContentTypeWhereInput
  types_none: ContentTypeWhereInput
  files_every: FileWhereInput
  files_some: FileWhereInput
  files_none: FileWhereInput
}

input ProjectWhereUniqueInput {
  id: ID
  generatedName: String
}

type Query {
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  projects(where: ProjectWhereInput, orderBy: ProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Project]!
  contentTypes(where: ContentTypeWhereInput, orderBy: ContentTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContentType]!
  contentTypeFields(where: ContentTypeFieldWhereInput, orderBy: ContentTypeFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ContentTypeField]!
  files(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [File]!
  user(where: UserWhereUniqueInput!): User
  project(where: ProjectWhereUniqueInput!): Project
  contentType(where: ContentTypeWhereUniqueInput!): ContentType
  contentTypeField(where: ContentTypeFieldWhereUniqueInput!): ContentTypeField
  file(where: FileWhereUniqueInput!): File
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  projectsConnection(where: ProjectWhereInput, orderBy: ProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ProjectConnection!
  contentTypesConnection(where: ContentTypeWhereInput, orderBy: ContentTypeOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContentTypeConnection!
  contentTypeFieldsConnection(where: ContentTypeFieldWhereInput, orderBy: ContentTypeFieldOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ContentTypeFieldConnection!
  filesConnection(where: FileWhereInput, orderBy: FileOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): FileConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

type Subscription {
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  project(where: ProjectSubscriptionWhereInput): ProjectSubscriptionPayload
  contentType(where: ContentTypeSubscriptionWhereInput): ContentTypeSubscriptionPayload
  contentTypeField(where: ContentTypeFieldSubscriptionWhereInput): ContentTypeFieldSubscriptionPayload
  file(where: FileSubscriptionWhereInput): FileSubscriptionPayload
}

type User implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  username: String!
  password: String!
  salt: String!
  imageUri: String
  projects(where: ProjectWhereInput, orderBy: ProjectOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Project!]
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  username: String!
  password: String!
  salt: String!
  imageUri: String
  projects: ProjectCreateManyWithoutUserInput
}

input UserCreateOneWithoutProjectsInput {
  create: UserCreateWithoutProjectsInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutProjectsInput {
  username: String!
  password: String!
  salt: String!
  imageUri: String
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  username_ASC
  username_DESC
  password_ASC
  password_DESC
  salt_ASC
  salt_DESC
  imageUri_ASC
  imageUri_DESC
}

type UserPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  username: String!
  password: String!
  salt: String!
  imageUri: String
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateInput {
  username: String
  password: String
  salt: String
  imageUri: String
  projects: ProjectUpdateManyWithoutUserInput
}

input UserUpdateOneWithoutProjectsInput {
  create: UserCreateWithoutProjectsInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateWithoutProjectsDataInput
  upsert: UserUpsertWithoutProjectsInput
}

input UserUpdateWithoutProjectsDataInput {
  username: String
  password: String
  salt: String
  imageUri: String
}

input UserUpsertWithoutProjectsInput {
  update: UserUpdateWithoutProjectsDataInput!
  create: UserCreateWithoutProjectsInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  username: String

  """All values that are not equal to given value."""
  username_not: String

  """All values that are contained in given list."""
  username_in: [String!]

  """All values that are not contained in given list."""
  username_not_in: [String!]

  """All values less than the given value."""
  username_lt: String

  """All values less than or equal the given value."""
  username_lte: String

  """All values greater than the given value."""
  username_gt: String

  """All values greater than or equal the given value."""
  username_gte: String

  """All values containing the given string."""
  username_contains: String

  """All values not containing the given string."""
  username_not_contains: String

  """All values starting with the given string."""
  username_starts_with: String

  """All values not starting with the given string."""
  username_not_starts_with: String

  """All values ending with the given string."""
  username_ends_with: String

  """All values not ending with the given string."""
  username_not_ends_with: String
  password: String

  """All values that are not equal to given value."""
  password_not: String

  """All values that are contained in given list."""
  password_in: [String!]

  """All values that are not contained in given list."""
  password_not_in: [String!]

  """All values less than the given value."""
  password_lt: String

  """All values less than or equal the given value."""
  password_lte: String

  """All values greater than the given value."""
  password_gt: String

  """All values greater than or equal the given value."""
  password_gte: String

  """All values containing the given string."""
  password_contains: String

  """All values not containing the given string."""
  password_not_contains: String

  """All values starting with the given string."""
  password_starts_with: String

  """All values not starting with the given string."""
  password_not_starts_with: String

  """All values ending with the given string."""
  password_ends_with: String

  """All values not ending with the given string."""
  password_not_ends_with: String
  salt: String

  """All values that are not equal to given value."""
  salt_not: String

  """All values that are contained in given list."""
  salt_in: [String!]

  """All values that are not contained in given list."""
  salt_not_in: [String!]

  """All values less than the given value."""
  salt_lt: String

  """All values less than or equal the given value."""
  salt_lte: String

  """All values greater than the given value."""
  salt_gt: String

  """All values greater than or equal the given value."""
  salt_gte: String

  """All values containing the given string."""
  salt_contains: String

  """All values not containing the given string."""
  salt_not_contains: String

  """All values starting with the given string."""
  salt_starts_with: String

  """All values not starting with the given string."""
  salt_not_starts_with: String

  """All values ending with the given string."""
  salt_ends_with: String

  """All values not ending with the given string."""
  salt_not_ends_with: String
  imageUri: String

  """All values that are not equal to given value."""
  imageUri_not: String

  """All values that are contained in given list."""
  imageUri_in: [String!]

  """All values that are not contained in given list."""
  imageUri_not_in: [String!]

  """All values less than the given value."""
  imageUri_lt: String

  """All values less than or equal the given value."""
  imageUri_lte: String

  """All values greater than the given value."""
  imageUri_gt: String

  """All values greater than or equal the given value."""
  imageUri_gte: String

  """All values containing the given string."""
  imageUri_contains: String

  """All values not containing the given string."""
  imageUri_not_contains: String

  """All values starting with the given string."""
  imageUri_starts_with: String

  """All values not starting with the given string."""
  imageUri_not_starts_with: String

  """All values ending with the given string."""
  imageUri_ends_with: String

  """All values not ending with the given string."""
  imageUri_not_ends_with: String
  projects_every: ProjectWhereInput
  projects_some: ProjectWhereInput
  projects_none: ProjectWhereInput
}

input UserWhereUniqueInput {
  id: ID
  username: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'username_ASC' |
  'username_DESC' |
  'password_ASC' |
  'password_DESC' |
  'salt_ASC' |
  'salt_DESC' |
  'imageUri_ASC' |
  'imageUri_DESC'

export type ContentTypeFieldType =   'String' |
  'Text' |
  'Int' |
  'Float' |
  'Checkbox' |
  'Date' |
  'Json' |
  'Image' |
  'File'

export type ProjectOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'providedName_ASC' |
  'providedName_DESC' |
  'generatedName_ASC' |
  'generatedName_DESC' |
  'stage_ASC' |
  'stage_DESC' |
  'secret_ASC' |
  'secret_DESC' |
  'datamodel_ASC' |
  'datamodel_DESC'

export type ContentTypeOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC' |
  'description_ASC' |
  'description_DESC'

export type ContentTypeFieldOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'name_ASC' |
  'name_DESC' |
  'type_ASC' |
  'type_DESC' |
  'isRequired_ASC' |
  'isRequired_DESC'

export type FileOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'originalName_ASC' |
  'originalName_DESC' |
  'fileName_ASC' |
  'fileName_DESC' |
  'size_ASC' |
  'size_DESC' |
  'mimeType_ASC' |
  'mimeType_DESC' |
  'url_ASC' |
  'url_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export interface ProjectCreateWithoutTypesInput {
  providedName: String
  generatedName: String
  stage: String
  secret?: String
  datamodel?: String
  user: UserCreateOneWithoutProjectsInput
  files?: FileCreateManyWithoutProjectInput
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  username?: String
  username_not?: String
  username_in?: String[] | String
  username_not_in?: String[] | String
  username_lt?: String
  username_lte?: String
  username_gt?: String
  username_gte?: String
  username_contains?: String
  username_not_contains?: String
  username_starts_with?: String
  username_not_starts_with?: String
  username_ends_with?: String
  username_not_ends_with?: String
  password?: String
  password_not?: String
  password_in?: String[] | String
  password_not_in?: String[] | String
  password_lt?: String
  password_lte?: String
  password_gt?: String
  password_gte?: String
  password_contains?: String
  password_not_contains?: String
  password_starts_with?: String
  password_not_starts_with?: String
  password_ends_with?: String
  password_not_ends_with?: String
  salt?: String
  salt_not?: String
  salt_in?: String[] | String
  salt_not_in?: String[] | String
  salt_lt?: String
  salt_lte?: String
  salt_gt?: String
  salt_gte?: String
  salt_contains?: String
  salt_not_contains?: String
  salt_starts_with?: String
  salt_not_starts_with?: String
  salt_ends_with?: String
  salt_not_ends_with?: String
  imageUri?: String
  imageUri_not?: String
  imageUri_in?: String[] | String
  imageUri_not_in?: String[] | String
  imageUri_lt?: String
  imageUri_lte?: String
  imageUri_gt?: String
  imageUri_gte?: String
  imageUri_contains?: String
  imageUri_not_contains?: String
  imageUri_starts_with?: String
  imageUri_not_starts_with?: String
  imageUri_ends_with?: String
  imageUri_not_ends_with?: String
  projects_every?: ProjectWhereInput
  projects_some?: ProjectWhereInput
  projects_none?: ProjectWhereInput
}

export interface ProjectCreateOneWithoutFilesInput {
  create?: ProjectCreateWithoutFilesInput
  connect?: ProjectWhereUniqueInput
}

export interface FileWhereInput {
  AND?: FileWhereInput[] | FileWhereInput
  OR?: FileWhereInput[] | FileWhereInput
  NOT?: FileWhereInput[] | FileWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  originalName?: String
  originalName_not?: String
  originalName_in?: String[] | String
  originalName_not_in?: String[] | String
  originalName_lt?: String
  originalName_lte?: String
  originalName_gt?: String
  originalName_gte?: String
  originalName_contains?: String
  originalName_not_contains?: String
  originalName_starts_with?: String
  originalName_not_starts_with?: String
  originalName_ends_with?: String
  originalName_not_ends_with?: String
  fileName?: String
  fileName_not?: String
  fileName_in?: String[] | String
  fileName_not_in?: String[] | String
  fileName_lt?: String
  fileName_lte?: String
  fileName_gt?: String
  fileName_gte?: String
  fileName_contains?: String
  fileName_not_contains?: String
  fileName_starts_with?: String
  fileName_not_starts_with?: String
  fileName_ends_with?: String
  fileName_not_ends_with?: String
  size?: Int
  size_not?: Int
  size_in?: Int[] | Int
  size_not_in?: Int[] | Int
  size_lt?: Int
  size_lte?: Int
  size_gt?: Int
  size_gte?: Int
  mimeType?: String
  mimeType_not?: String
  mimeType_in?: String[] | String
  mimeType_not_in?: String[] | String
  mimeType_lt?: String
  mimeType_lte?: String
  mimeType_gt?: String
  mimeType_gte?: String
  mimeType_contains?: String
  mimeType_not_contains?: String
  mimeType_starts_with?: String
  mimeType_not_starts_with?: String
  mimeType_ends_with?: String
  mimeType_not_ends_with?: String
  url?: String
  url_not?: String
  url_in?: String[] | String
  url_not_in?: String[] | String
  url_lt?: String
  url_lte?: String
  url_gt?: String
  url_gte?: String
  url_contains?: String
  url_not_contains?: String
  url_starts_with?: String
  url_not_starts_with?: String
  url_ends_with?: String
  url_not_ends_with?: String
  project?: ProjectWhereInput
}

export interface ProjectCreateWithoutUserInput {
  providedName: String
  generatedName: String
  stage: String
  secret?: String
  datamodel?: String
  types?: ContentTypeCreateManyWithoutProjectInput
  files?: FileCreateManyWithoutProjectInput
}

export interface FileUpdateWithWhereUniqueWithoutProjectInput {
  where: FileWhereUniqueInput
  data: FileUpdateWithoutProjectDataInput
}

export interface ContentTypeCreateManyWithoutProjectInput {
  create?: ContentTypeCreateWithoutProjectInput[] | ContentTypeCreateWithoutProjectInput
  connect?: ContentTypeWhereUniqueInput[] | ContentTypeWhereUniqueInput
}

export interface ProjectCreateWithoutFilesInput {
  providedName: String
  generatedName: String
  stage: String
  secret?: String
  datamodel?: String
  user: UserCreateOneWithoutProjectsInput
  types?: ContentTypeCreateManyWithoutProjectInput
}

export interface ContentTypeCreateWithoutProjectInput {
  name: String
  description?: String
  fields?: ContentTypeFieldCreateManyWithoutContentTypeInput
}

export interface ContentTypeFieldWhereInput {
  AND?: ContentTypeFieldWhereInput[] | ContentTypeFieldWhereInput
  OR?: ContentTypeFieldWhereInput[] | ContentTypeFieldWhereInput
  NOT?: ContentTypeFieldWhereInput[] | ContentTypeFieldWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  type?: ContentTypeFieldType
  type_not?: ContentTypeFieldType
  type_in?: ContentTypeFieldType[] | ContentTypeFieldType
  type_not_in?: ContentTypeFieldType[] | ContentTypeFieldType
  isRequired?: Boolean
  isRequired_not?: Boolean
  contentType?: ContentTypeWhereInput
}

export interface ContentTypeFieldCreateManyWithoutContentTypeInput {
  create?: ContentTypeFieldCreateWithoutContentTypeInput[] | ContentTypeFieldCreateWithoutContentTypeInput
  connect?: ContentTypeFieldWhereUniqueInput[] | ContentTypeFieldWhereUniqueInput
}

export interface ContentTypeWhereInput {
  AND?: ContentTypeWhereInput[] | ContentTypeWhereInput
  OR?: ContentTypeWhereInput[] | ContentTypeWhereInput
  NOT?: ContentTypeWhereInput[] | ContentTypeWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  description?: String
  description_not?: String
  description_in?: String[] | String
  description_not_in?: String[] | String
  description_lt?: String
  description_lte?: String
  description_gt?: String
  description_gte?: String
  description_contains?: String
  description_not_contains?: String
  description_starts_with?: String
  description_not_starts_with?: String
  description_ends_with?: String
  description_not_ends_with?: String
  project?: ProjectWhereInput
  fields_every?: ContentTypeFieldWhereInput
  fields_some?: ContentTypeFieldWhereInput
  fields_none?: ContentTypeFieldWhereInput
}

export interface ContentTypeFieldCreateWithoutContentTypeInput {
  name: String
  type: ContentTypeFieldType
  isRequired: Boolean
}

export interface ProjectWhereInput {
  AND?: ProjectWhereInput[] | ProjectWhereInput
  OR?: ProjectWhereInput[] | ProjectWhereInput
  NOT?: ProjectWhereInput[] | ProjectWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  providedName?: String
  providedName_not?: String
  providedName_in?: String[] | String
  providedName_not_in?: String[] | String
  providedName_lt?: String
  providedName_lte?: String
  providedName_gt?: String
  providedName_gte?: String
  providedName_contains?: String
  providedName_not_contains?: String
  providedName_starts_with?: String
  providedName_not_starts_with?: String
  providedName_ends_with?: String
  providedName_not_ends_with?: String
  generatedName?: String
  generatedName_not?: String
  generatedName_in?: String[] | String
  generatedName_not_in?: String[] | String
  generatedName_lt?: String
  generatedName_lte?: String
  generatedName_gt?: String
  generatedName_gte?: String
  generatedName_contains?: String
  generatedName_not_contains?: String
  generatedName_starts_with?: String
  generatedName_not_starts_with?: String
  generatedName_ends_with?: String
  generatedName_not_ends_with?: String
  stage?: String
  stage_not?: String
  stage_in?: String[] | String
  stage_not_in?: String[] | String
  stage_lt?: String
  stage_lte?: String
  stage_gt?: String
  stage_gte?: String
  stage_contains?: String
  stage_not_contains?: String
  stage_starts_with?: String
  stage_not_starts_with?: String
  stage_ends_with?: String
  stage_not_ends_with?: String
  secret?: String
  secret_not?: String
  secret_in?: String[] | String
  secret_not_in?: String[] | String
  secret_lt?: String
  secret_lte?: String
  secret_gt?: String
  secret_gte?: String
  secret_contains?: String
  secret_not_contains?: String
  secret_starts_with?: String
  secret_not_starts_with?: String
  secret_ends_with?: String
  secret_not_ends_with?: String
  datamodel?: String
  datamodel_not?: String
  datamodel_in?: String[] | String
  datamodel_not_in?: String[] | String
  datamodel_lt?: String
  datamodel_lte?: String
  datamodel_gt?: String
  datamodel_gte?: String
  datamodel_contains?: String
  datamodel_not_contains?: String
  datamodel_starts_with?: String
  datamodel_not_starts_with?: String
  datamodel_ends_with?: String
  datamodel_not_ends_with?: String
  user?: UserWhereInput
  types_every?: ContentTypeWhereInput
  types_some?: ContentTypeWhereInput
  types_none?: ContentTypeWhereInput
  files_every?: FileWhereInput
  files_some?: FileWhereInput
  files_none?: FileWhereInput
}

export interface FileCreateManyWithoutProjectInput {
  create?: FileCreateWithoutProjectInput[] | FileCreateWithoutProjectInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
}

export interface ProjectSubscriptionWhereInput {
  AND?: ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput
  OR?: ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput
  NOT?: ProjectSubscriptionWhereInput[] | ProjectSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ProjectWhereInput
}

export interface FileCreateWithoutProjectInput {
  originalName: String
  fileName: String
  size: Int
  mimeType: String
  url: String
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  username?: String
}

export interface ProjectCreateInput {
  providedName: String
  generatedName: String
  stage: String
  secret?: String
  datamodel?: String
  user: UserCreateOneWithoutProjectsInput
  types?: ContentTypeCreateManyWithoutProjectInput
  files?: FileCreateManyWithoutProjectInput
}

export interface ContentTypeWhereUniqueInput {
  id?: ID_Input
}

export interface UserCreateOneWithoutProjectsInput {
  create?: UserCreateWithoutProjectsInput
  connect?: UserWhereUniqueInput
}

export interface FileWhereUniqueInput {
  id?: ID_Input
  url?: String
}

export interface UserCreateWithoutProjectsInput {
  username: String
  password: String
  salt: String
  imageUri?: String
}

export interface ProjectUpdateWithoutFilesDataInput {
  providedName?: String
  generatedName?: String
  stage?: String
  secret?: String
  datamodel?: String
  user?: UserUpdateOneWithoutProjectsInput
  types?: ContentTypeUpdateManyWithoutProjectInput
}

export interface ContentTypeCreateInput {
  name: String
  description?: String
  project: ProjectCreateOneWithoutTypesInput
  fields?: ContentTypeFieldCreateManyWithoutContentTypeInput
}

export interface FileUpdateInput {
  originalName?: String
  fileName?: String
  size?: Int
  mimeType?: String
  url?: String
  project?: ProjectUpdateOneWithoutFilesInput
}

export interface ProjectCreateOneWithoutTypesInput {
  create?: ProjectCreateWithoutTypesInput
  connect?: ProjectWhereUniqueInput
}

export interface ContentTypeUpdateWithoutFieldsDataInput {
  name?: String
  description?: String
  project?: ProjectUpdateOneWithoutTypesInput
}

export interface ProjectUpsertWithWhereUniqueWithoutUserInput {
  where: ProjectWhereUniqueInput
  update: ProjectUpdateWithoutUserDataInput
  create: ProjectCreateWithoutUserInput
}

export interface ContentTypeFieldUpdateInput {
  name?: String
  type?: ContentTypeFieldType
  isRequired?: Boolean
  contentType?: ContentTypeUpdateOneWithoutFieldsInput
}

export interface ContentTypeFieldCreateInput {
  name: String
  type: ContentTypeFieldType
  isRequired: Boolean
  contentType: ContentTypeCreateOneWithoutFieldsInput
}

export interface ProjectUpdateWithoutTypesDataInput {
  providedName?: String
  generatedName?: String
  stage?: String
  secret?: String
  datamodel?: String
  user?: UserUpdateOneWithoutProjectsInput
  files?: FileUpdateManyWithoutProjectInput
}

export interface ContentTypeCreateOneWithoutFieldsInput {
  create?: ContentTypeCreateWithoutFieldsInput
  connect?: ContentTypeWhereUniqueInput
}

export interface ContentTypeUpdateInput {
  name?: String
  description?: String
  project?: ProjectUpdateOneWithoutTypesInput
  fields?: ContentTypeFieldUpdateManyWithoutContentTypeInput
}

export interface ContentTypeCreateWithoutFieldsInput {
  name: String
  description?: String
  project: ProjectCreateOneWithoutTypesInput
}

export interface UserUpdateWithoutProjectsDataInput {
  username?: String
  password?: String
  salt?: String
  imageUri?: String
}

export interface FileCreateInput {
  originalName: String
  fileName: String
  size: Int
  mimeType: String
  url: String
  project: ProjectCreateOneWithoutFilesInput
}

export interface ProjectUpdateInput {
  providedName?: String
  generatedName?: String
  stage?: String
  secret?: String
  datamodel?: String
  user?: UserUpdateOneWithoutProjectsInput
  types?: ContentTypeUpdateManyWithoutProjectInput
  files?: FileUpdateManyWithoutProjectInput
}

export interface FileUpsertWithWhereUniqueWithoutProjectInput {
  where: FileWhereUniqueInput
  update: FileUpdateWithoutProjectDataInput
  create: FileCreateWithoutProjectInput
}

export interface ProjectCreateManyWithoutUserInput {
  create?: ProjectCreateWithoutUserInput[] | ProjectCreateWithoutUserInput
  connect?: ProjectWhereUniqueInput[] | ProjectWhereUniqueInput
}

export interface FileUpdateWithoutProjectDataInput {
  originalName?: String
  fileName?: String
  size?: Int
  mimeType?: String
  url?: String
}

export interface FileSubscriptionWhereInput {
  AND?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  OR?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  NOT?: FileSubscriptionWhereInput[] | FileSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: FileWhereInput
}

export interface UserUpdateInput {
  username?: String
  password?: String
  salt?: String
  imageUri?: String
  projects?: ProjectUpdateManyWithoutUserInput
}

export interface ContentTypeSubscriptionWhereInput {
  AND?: ContentTypeSubscriptionWhereInput[] | ContentTypeSubscriptionWhereInput
  OR?: ContentTypeSubscriptionWhereInput[] | ContentTypeSubscriptionWhereInput
  NOT?: ContentTypeSubscriptionWhereInput[] | ContentTypeSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ContentTypeWhereInput
}

export interface ProjectUpdateManyWithoutUserInput {
  create?: ProjectCreateWithoutUserInput[] | ProjectCreateWithoutUserInput
  connect?: ProjectWhereUniqueInput[] | ProjectWhereUniqueInput
  disconnect?: ProjectWhereUniqueInput[] | ProjectWhereUniqueInput
  delete?: ProjectWhereUniqueInput[] | ProjectWhereUniqueInput
  update?: ProjectUpdateWithWhereUniqueWithoutUserInput[] | ProjectUpdateWithWhereUniqueWithoutUserInput
  upsert?: ProjectUpsertWithWhereUniqueWithoutUserInput[] | ProjectUpsertWithWhereUniqueWithoutUserInput
}

export interface ProjectWhereUniqueInput {
  id?: ID_Input
  generatedName?: String
}

export interface ProjectUpdateWithWhereUniqueWithoutUserInput {
  where: ProjectWhereUniqueInput
  data: ProjectUpdateWithoutUserDataInput
}

export interface ProjectUpsertWithoutFilesInput {
  update: ProjectUpdateWithoutFilesDataInput
  create: ProjectCreateWithoutFilesInput
}

export interface ProjectUpdateWithoutUserDataInput {
  providedName?: String
  generatedName?: String
  stage?: String
  secret?: String
  datamodel?: String
  types?: ContentTypeUpdateManyWithoutProjectInput
  files?: FileUpdateManyWithoutProjectInput
}

export interface ContentTypeUpsertWithoutFieldsInput {
  update: ContentTypeUpdateWithoutFieldsDataInput
  create: ContentTypeCreateWithoutFieldsInput
}

export interface ContentTypeUpdateManyWithoutProjectInput {
  create?: ContentTypeCreateWithoutProjectInput[] | ContentTypeCreateWithoutProjectInput
  connect?: ContentTypeWhereUniqueInput[] | ContentTypeWhereUniqueInput
  disconnect?: ContentTypeWhereUniqueInput[] | ContentTypeWhereUniqueInput
  delete?: ContentTypeWhereUniqueInput[] | ContentTypeWhereUniqueInput
  update?: ContentTypeUpdateWithWhereUniqueWithoutProjectInput[] | ContentTypeUpdateWithWhereUniqueWithoutProjectInput
  upsert?: ContentTypeUpsertWithWhereUniqueWithoutProjectInput[] | ContentTypeUpsertWithWhereUniqueWithoutProjectInput
}

export interface ProjectUpsertWithoutTypesInput {
  update: ProjectUpdateWithoutTypesDataInput
  create: ProjectCreateWithoutTypesInput
}

export interface ContentTypeUpdateWithWhereUniqueWithoutProjectInput {
  where: ContentTypeWhereUniqueInput
  data: ContentTypeUpdateWithoutProjectDataInput
}

export interface UserUpsertWithoutProjectsInput {
  update: UserUpdateWithoutProjectsDataInput
  create: UserCreateWithoutProjectsInput
}

export interface ContentTypeUpdateWithoutProjectDataInput {
  name?: String
  description?: String
  fields?: ContentTypeFieldUpdateManyWithoutContentTypeInput
}

export interface UserCreateInput {
  username: String
  password: String
  salt: String
  imageUri?: String
  projects?: ProjectCreateManyWithoutUserInput
}

export interface ContentTypeFieldUpdateManyWithoutContentTypeInput {
  create?: ContentTypeFieldCreateWithoutContentTypeInput[] | ContentTypeFieldCreateWithoutContentTypeInput
  connect?: ContentTypeFieldWhereUniqueInput[] | ContentTypeFieldWhereUniqueInput
  disconnect?: ContentTypeFieldWhereUniqueInput[] | ContentTypeFieldWhereUniqueInput
  delete?: ContentTypeFieldWhereUniqueInput[] | ContentTypeFieldWhereUniqueInput
  update?: ContentTypeFieldUpdateWithWhereUniqueWithoutContentTypeInput[] | ContentTypeFieldUpdateWithWhereUniqueWithoutContentTypeInput
  upsert?: ContentTypeFieldUpsertWithWhereUniqueWithoutContentTypeInput[] | ContentTypeFieldUpsertWithWhereUniqueWithoutContentTypeInput
}

export interface ContentTypeFieldSubscriptionWhereInput {
  AND?: ContentTypeFieldSubscriptionWhereInput[] | ContentTypeFieldSubscriptionWhereInput
  OR?: ContentTypeFieldSubscriptionWhereInput[] | ContentTypeFieldSubscriptionWhereInput
  NOT?: ContentTypeFieldSubscriptionWhereInput[] | ContentTypeFieldSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ContentTypeFieldWhereInput
}

export interface ContentTypeFieldUpdateWithWhereUniqueWithoutContentTypeInput {
  where: ContentTypeFieldWhereUniqueInput
  data: ContentTypeFieldUpdateWithoutContentTypeDataInput
}

export interface ContentTypeFieldWhereUniqueInput {
  id?: ID_Input
}

export interface ContentTypeUpdateOneWithoutFieldsInput {
  create?: ContentTypeCreateWithoutFieldsInput
  connect?: ContentTypeWhereUniqueInput
  delete?: Boolean
  update?: ContentTypeUpdateWithoutFieldsDataInput
  upsert?: ContentTypeUpsertWithoutFieldsInput
}

export interface FileUpdateManyWithoutProjectInput {
  create?: FileCreateWithoutProjectInput[] | FileCreateWithoutProjectInput
  connect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  disconnect?: FileWhereUniqueInput[] | FileWhereUniqueInput
  delete?: FileWhereUniqueInput[] | FileWhereUniqueInput
  update?: FileUpdateWithWhereUniqueWithoutProjectInput[] | FileUpdateWithWhereUniqueWithoutProjectInput
  upsert?: FileUpsertWithWhereUniqueWithoutProjectInput[] | FileUpsertWithWhereUniqueWithoutProjectInput
}

export interface ContentTypeUpsertWithWhereUniqueWithoutProjectInput {
  where: ContentTypeWhereUniqueInput
  update: ContentTypeUpdateWithoutProjectDataInput
  create: ContentTypeCreateWithoutProjectInput
}

export interface ContentTypeFieldUpsertWithWhereUniqueWithoutContentTypeInput {
  where: ContentTypeFieldWhereUniqueInput
  update: ContentTypeFieldUpdateWithoutContentTypeDataInput
  create: ContentTypeFieldCreateWithoutContentTypeInput
}

export interface ContentTypeFieldUpdateWithoutContentTypeDataInput {
  name?: String
  type?: ContentTypeFieldType
  isRequired?: Boolean
}

export interface ProjectUpdateOneWithoutTypesInput {
  create?: ProjectCreateWithoutTypesInput
  connect?: ProjectWhereUniqueInput
  delete?: Boolean
  update?: ProjectUpdateWithoutTypesDataInput
  upsert?: ProjectUpsertWithoutTypesInput
}

export interface ProjectUpdateOneWithoutFilesInput {
  create?: ProjectCreateWithoutFilesInput
  connect?: ProjectWhereUniqueInput
  delete?: Boolean
  update?: ProjectUpdateWithoutFilesDataInput
  upsert?: ProjectUpsertWithoutFilesInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface UserUpdateOneWithoutProjectsInput {
  create?: UserCreateWithoutProjectsInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateWithoutProjectsDataInput
  upsert?: UserUpsertWithoutProjectsInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface FilePreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  originalName: String
  fileName: String
  size: Int
  mimeType: String
  url: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface User extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  username: String
  password: String
  salt: String
  imageUri?: String
  projects?: Project[]
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

export interface ContentType extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  project: Project
  name: String
  description?: String
  fields?: ContentTypeField[]
}

export interface FileSubscriptionPayload {
  mutation: MutationType
  node?: File
  updatedFields?: String[]
  previousValues?: FilePreviousValues
}

export interface BatchPayload {
  count: Long
}

export interface AggregateFile {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface FileConnection {
  pageInfo: PageInfo
  edges: FileEdge[]
  aggregate: AggregateFile
}

export interface Project extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  user: User
  types?: ContentType[]
  providedName: String
  generatedName: String
  stage: String
  secret?: String
  datamodel: String
  files?: File[]
}

/*
 * An edge in a connection.

 */
export interface ContentTypeFieldEdge {
  node: ContentTypeField
  cursor: String
}

export interface File extends Node {
  id: ID_Output
  project: Project
  createdAt: DateTime
  updatedAt: DateTime
  originalName: String
  fileName: String
  size: Int
  mimeType: String
  url: String
}

export interface AggregateContentType {
  count: Int
}

export interface ContentTypeFieldPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  type: ContentTypeFieldType
  isRequired: Boolean
}

/*
 * A connection to a list of items.

 */
export interface ContentTypeConnection {
  pageInfo: PageInfo
  edges: ContentTypeEdge[]
  aggregate: AggregateContentType
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * An edge in a connection.

 */
export interface ProjectEdge {
  node: Project
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  username: String
  password: String
  salt: String
  imageUri?: String
}

export interface AggregateUser {
  count: Int
}

export interface ContentTypeFieldSubscriptionPayload {
  mutation: MutationType
  node?: ContentTypeField
  updatedFields?: String[]
  previousValues?: ContentTypeFieldPreviousValues
}

/*
 * An edge in a connection.

 */
export interface FileEdge {
  node: File
  cursor: String
}

export interface ProjectSubscriptionPayload {
  mutation: MutationType
  node?: Project
  updatedFields?: String[]
  previousValues?: ProjectPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface ContentTypeFieldConnection {
  pageInfo: PageInfo
  edges: ContentTypeFieldEdge[]
  aggregate: AggregateContentTypeField
}

export interface AggregateProject {
  count: Int
}

export interface ContentTypePreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  name: String
  description?: String
}

export interface ContentTypeSubscriptionPayload {
  mutation: MutationType
  node?: ContentType
  updatedFields?: String[]
  previousValues?: ContentTypePreviousValues
}

export interface ContentTypeField extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  contentType: ContentType
  name: String
  type: ContentTypeFieldType
  isRequired: Boolean
}

export interface ProjectPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  providedName: String
  generatedName: String
  stage: String
  secret?: String
  datamodel: String
}

/*
 * A connection to a list of items.

 */
export interface ProjectConnection {
  pageInfo: PageInfo
  edges: ProjectEdge[]
  aggregate: AggregateProject
}

/*
 * An edge in a connection.

 */
export interface ContentTypeEdge {
  node: ContentType
  cursor: String
}

export interface AggregateContentTypeField {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

export type DateTime = Date | string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string