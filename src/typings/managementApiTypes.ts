/* tslint:disable */
import { GraphQLResolveInfo } from 'graphql'

export type Resolver<Result, Parent = any, Context = any, Args = any> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result

export type SubscriptionResolver<Result, Parent = any, Context = any, Args = any> = {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result>
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>
}

export type DateTime = any
/** This is a migration step. */
export interface MigrationStep {
  type: string
}

export interface Query {
  migrationStatus: Migration /** Shows the status of the next migration in line to be applied to the project. If no such migration exists, it shows the last applied migration. */
  listProjects: Project[] /** Shows all projects the caller has access to. */
  listMigrations: Migration[] /** Shows all migrations for the project. Debug query, will likely be removed in the future. */
  project: Project /** Gets a project by name and stage. */
  serverInfo: ServerInfo /** Information about the server */
  generateProjectToken: string /** generates a token for the given project */
}
/** This is a migration */
export interface Migration {
  projectId: string
  revision: number
  status: string
  applied: number
  rolledBack: number
  steps: MigrationStep[]
  errors: string[]
  startedAt?: DateTime | null
  finishedAt?: DateTime | null
}
/** This is a project */
export interface Project {
  name: string
  stage: string
}
/** Information about the deployed server */
export interface ServerInfo {
  version: string
  commit: string
  primaryConnector: string
}

export interface Mutation {
  deploy?: DeployPayload | null
  addProject?: AddProjectPayload | null
  deleteProject?: DeleteProjectPayload | null
  setCloudSecret?: SetCloudSecretPayload | null
}

export interface DeployPayload {
  errors: SchemaError[]
  migration?: Migration | null
  warnings: SchemaWarning[]
  clientMutationId?: string | null
}
/** An error that occurred while validating the schema. */
export interface SchemaError {
  type: string
  field?: string | null
  description: string
}
/** A warning created while validating the schema against existing data. */
export interface SchemaWarning {
  type: string
  field?: string | null
  description: string
}

export interface AddProjectPayload {
  project?: Project | null
  clientMutationId?: string | null
}

export interface DeleteProjectPayload {
  project?: Project | null
  clientMutationId?: string | null
}

export interface SetCloudSecretPayload {
  clientMutationId?: string | null
}

export interface CreateEnum extends MigrationStep {
  name: string
  values: string[]
  type: string
}

export interface CreateField extends MigrationStep {
  model: string
  name: string
  typeName: string
  isRequired: boolean
  isList: boolean
  unique: boolean
  relation?: string | null
  default?: string | null
  enum?: string | null
  type: string
}

export interface CreateModel extends MigrationStep {
  name: string
  type: string
}

export interface CreateRelation extends MigrationStep {
  name: string
  leftModel: string
  rightModel: string
  type: string
}

export interface DeleteEnum extends MigrationStep {
  name: string
  type: string
}

export interface DeleteField extends MigrationStep {
  model: string
  name: string
  type: string
}

export interface DeleteModel extends MigrationStep {
  name: string
  type: string
}

export interface DeleteRelation extends MigrationStep {
  name: string
  type: string
}

export interface UpdateEnum extends MigrationStep {
  name: string
  newName?: string | null
  values?: string[] | null
  type: string
}

export interface UpdateField extends MigrationStep {
  model: string
  name: string
  newName?: string | null
  typeName?: string | null
  isRequired?: boolean | null
  isList?: boolean | null
  unique?: boolean | null
  relation?: string | null
  default?: string | null
  enum?: string | null
  type: string
}

export interface UpdateModel extends MigrationStep {
  name: string
  newName: string
  type: string
}

export interface UpdateRelation extends MigrationStep {
  name: string
  newName?: string | null
  modelAId?: string | null
  modelBId?: string | null
  type: string
}

export interface UpdateSecrets extends MigrationStep {
  message: string
  type: string
}

export interface DeployInput {
  name: string
  stage: string
  types: string
  dryRun?: boolean | null
  secrets?: string[] | null
  subscriptions?: FunctionInput[] | null
  force?: boolean | null
  clientMutationId?: string | null
}

export interface FunctionInput {
  name: string
  query: string
  url: string
  headers: HeaderInput[]
}

export interface HeaderInput {
  name: string
  value: string
}

export interface AddProjectInput {
  name: string
  stage: string
  secrets?: string[] | null
  clientMutationId?: string | null
}

export interface DeleteProjectInput {
  name: string
  stage: string
  clientMutationId?: string | null
}

export interface SetCloudSecretInput {
  secret?: string | null
  clientMutationId?: string | null
}
export interface MigrationStatusQueryArgs {
  name: string
  stage: string
}
export interface ListMigrationsQueryArgs {
  name: string
  stage: string
}
export interface ProjectQueryArgs {
  name: string
  stage: string
}
export interface GenerateProjectTokenQueryArgs {
  name: string
  stage: string
}
export interface DeployMutationArgs {
  input: DeployInput
}
export interface AddProjectMutationArgs {
  input: AddProjectInput
}
export interface DeleteProjectMutationArgs {
  input: DeleteProjectInput
}
export interface SetCloudSecretMutationArgs {
  input: SetCloudSecretInput
}

export interface QueryResolvers<Context = any> {
  migrationStatus?: QueryMigrationStatusResolver<
    Migration,
    any,
    Context
  > /** Shows the status of the next migration in line to be applied to the project. If no such migration exists, it shows the last applied migration. */
  listProjects?: QueryListProjectsResolver<
    Project[],
    any,
    Context
  > /** Shows all projects the caller has access to. */
  listMigrations?: QueryListMigrationsResolver<
    Migration[],
    any,
    Context
  > /** Shows all migrations for the project. Debug query, will likely be removed in the future. */
  project?: QueryProjectResolver<
    Project,
    any,
    Context
  > /** Gets a project by name and stage. */
  serverInfo?: QueryServerInfoResolver<
    ServerInfo,
    any,
    Context
  > /** Information about the server */
  generateProjectToken?: QueryGenerateProjectTokenResolver<
    string,
    any,
    Context
  > /** generates a token for the given project */
}

export type QueryMigrationStatusResolver<
  R = Migration,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export interface QueryMigrationStatusArgs {
  name: string
  stage: string
}

export type QueryListProjectsResolver<R = Project[], Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type QueryListMigrationsResolver<
  R = Migration[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export interface QueryListMigrationsArgs {
  name: string
  stage: string
}

export type QueryProjectResolver<R = Project, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export interface QueryProjectArgs {
  name: string
  stage: string
}

export type QueryServerInfoResolver<R = ServerInfo, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type QueryGenerateProjectTokenResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export interface QueryGenerateProjectTokenArgs {
  name: string
  stage: string
}

/** This is a migration */
export interface MigrationResolvers<Context = any> {
  projectId?: MigrationProjectIdResolver<string, any, Context>
  revision?: MigrationRevisionResolver<number, any, Context>
  status?: MigrationStatusResolver<string, any, Context>
  applied?: MigrationAppliedResolver<number, any, Context>
  rolledBack?: MigrationRolledBackResolver<number, any, Context>
  steps?: MigrationStepsResolver<MigrationStep[], any, Context>
  errors?: MigrationErrorsResolver<string[], any, Context>
  startedAt?: MigrationStartedAtResolver<DateTime | null, any, Context>
  finishedAt?: MigrationFinishedAtResolver<DateTime | null, any, Context>
}

export type MigrationProjectIdResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type MigrationRevisionResolver<R = number, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type MigrationStatusResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type MigrationAppliedResolver<R = number, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type MigrationRolledBackResolver<R = number, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type MigrationStepsResolver<
  R = MigrationStep[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type MigrationErrorsResolver<R = string[], Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type MigrationStartedAtResolver<
  R = DateTime | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type MigrationFinishedAtResolver<
  R = DateTime | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
/** This is a project */
export interface ProjectResolvers<Context = any> {
  name?: ProjectNameResolver<string, any, Context>
  stage?: ProjectStageResolver<string, any, Context>
}

export type ProjectNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type ProjectStageResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
/** Information about the deployed server */
export interface ServerInfoResolvers<Context = any> {
  version?: ServerInfoVersionResolver<string, any, Context>
  commit?: ServerInfoCommitResolver<string, any, Context>
  primaryConnector?: ServerInfoPrimaryConnectorResolver<string, any, Context>
}

export type ServerInfoVersionResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type ServerInfoCommitResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type ServerInfoPrimaryConnectorResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>

export interface MutationResolvers<Context = any> {
  deploy?: MutationDeployResolver<DeployPayload | null, any, Context>
  addProject?: MutationAddProjectResolver<AddProjectPayload | null, any, Context>
  deleteProject?: MutationDeleteProjectResolver<DeleteProjectPayload | null, any, Context>
  setCloudSecret?: MutationSetCloudSecretResolver<SetCloudSecretPayload | null, any, Context>
}

export type MutationDeployResolver<
  R = DeployPayload | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export interface MutationDeployArgs {
  input: DeployInput
}

export type MutationAddProjectResolver<
  R = AddProjectPayload | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export interface MutationAddProjectArgs {
  input: AddProjectInput
}

export type MutationDeleteProjectResolver<
  R = DeleteProjectPayload | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export interface MutationDeleteProjectArgs {
  input: DeleteProjectInput
}

export type MutationSetCloudSecretResolver<
  R = SetCloudSecretPayload | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export interface MutationSetCloudSecretArgs {
  input: SetCloudSecretInput
}

export interface DeployPayloadResolvers<Context = any> {
  errors?: DeployPayloadErrorsResolver<SchemaError[], any, Context>
  migration?: DeployPayloadMigrationResolver<Migration | null, any, Context>
  warnings?: DeployPayloadWarningsResolver<SchemaWarning[], any, Context>
  clientMutationId?: DeployPayloadClientMutationIdResolver<string | null, any, Context>
}

export type DeployPayloadErrorsResolver<
  R = SchemaError[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type DeployPayloadMigrationResolver<
  R = Migration | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type DeployPayloadWarningsResolver<
  R = SchemaWarning[],
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type DeployPayloadClientMutationIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
/** An error that occurred while validating the schema. */
export interface SchemaErrorResolvers<Context = any> {
  type?: SchemaErrorTypeResolver<string, any, Context>
  field?: SchemaErrorFieldResolver<string | null, any, Context>
  description?: SchemaErrorDescriptionResolver<string, any, Context>
}

export type SchemaErrorTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type SchemaErrorFieldResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type SchemaErrorDescriptionResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
/** A warning created while validating the schema against existing data. */
export interface SchemaWarningResolvers<Context = any> {
  type?: SchemaWarningTypeResolver<string, any, Context>
  field?: SchemaWarningFieldResolver<string | null, any, Context>
  description?: SchemaWarningDescriptionResolver<string, any, Context>
}

export type SchemaWarningTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type SchemaWarningFieldResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type SchemaWarningDescriptionResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>

export interface AddProjectPayloadResolvers<Context = any> {
  project?: AddProjectPayloadProjectResolver<Project | null, any, Context>
  clientMutationId?: AddProjectPayloadClientMutationIdResolver<string | null, any, Context>
}

export type AddProjectPayloadProjectResolver<
  R = Project | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type AddProjectPayloadClientMutationIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>

export interface DeleteProjectPayloadResolvers<Context = any> {
  project?: DeleteProjectPayloadProjectResolver<Project | null, any, Context>
  clientMutationId?: DeleteProjectPayloadClientMutationIdResolver<string | null, any, Context>
}

export type DeleteProjectPayloadProjectResolver<
  R = Project | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type DeleteProjectPayloadClientMutationIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>

export interface SetCloudSecretPayloadResolvers<Context = any> {
  clientMutationId?: SetCloudSecretPayloadClientMutationIdResolver<string | null, any, Context>
}

export type SetCloudSecretPayloadClientMutationIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>

export interface CreateEnumResolvers<Context = any> {
  name?: CreateEnumNameResolver<string, any, Context>
  values?: CreateEnumValuesResolver<string[], any, Context>
  type?: CreateEnumTypeResolver<string, any, Context>
}

export type CreateEnumNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateEnumValuesResolver<R = string[], Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateEnumTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface CreateFieldResolvers<Context = any> {
  model?: CreateFieldModelResolver<string, any, Context>
  name?: CreateFieldNameResolver<string, any, Context>
  typeName?: CreateFieldTypeNameResolver<string, any, Context>
  isRequired?: CreateFieldIsRequiredResolver<boolean, any, Context>
  isList?: CreateFieldIsListResolver<boolean, any, Context>
  unique?: CreateFieldUniqueResolver<boolean, any, Context>
  relation?: CreateFieldRelationResolver<string | null, any, Context>
  default?: CreateFieldDefaultResolver<string | null, any, Context>
  enum?: CreateFieldEnumResolver<string | null, any, Context>
  type?: CreateFieldTypeResolver<string, any, Context>
}

export type CreateFieldModelResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateFieldNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateFieldTypeNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateFieldIsRequiredResolver<R = boolean, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateFieldIsListResolver<R = boolean, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateFieldUniqueResolver<R = boolean, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateFieldRelationResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type CreateFieldDefaultResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type CreateFieldEnumResolver<R = string | null, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateFieldTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface CreateModelResolvers<Context = any> {
  name?: CreateModelNameResolver<string, any, Context>
  type?: CreateModelTypeResolver<string, any, Context>
}

export type CreateModelNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateModelTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface CreateRelationResolvers<Context = any> {
  name?: CreateRelationNameResolver<string, any, Context>
  leftModel?: CreateRelationLeftModelResolver<string, any, Context>
  rightModel?: CreateRelationRightModelResolver<string, any, Context>
  type?: CreateRelationTypeResolver<string, any, Context>
}

export type CreateRelationNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type CreateRelationLeftModelResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type CreateRelationRightModelResolver<
  R = string,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type CreateRelationTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface DeleteEnumResolvers<Context = any> {
  name?: DeleteEnumNameResolver<string, any, Context>
  type?: DeleteEnumTypeResolver<string, any, Context>
}

export type DeleteEnumNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type DeleteEnumTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface DeleteFieldResolvers<Context = any> {
  model?: DeleteFieldModelResolver<string, any, Context>
  name?: DeleteFieldNameResolver<string, any, Context>
  type?: DeleteFieldTypeResolver<string, any, Context>
}

export type DeleteFieldModelResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type DeleteFieldNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type DeleteFieldTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface DeleteModelResolvers<Context = any> {
  name?: DeleteModelNameResolver<string, any, Context>
  type?: DeleteModelTypeResolver<string, any, Context>
}

export type DeleteModelNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type DeleteModelTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface DeleteRelationResolvers<Context = any> {
  name?: DeleteRelationNameResolver<string, any, Context>
  type?: DeleteRelationTypeResolver<string, any, Context>
}

export type DeleteRelationNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type DeleteRelationTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface UpdateEnumResolvers<Context = any> {
  name?: UpdateEnumNameResolver<string, any, Context>
  newName?: UpdateEnumNewNameResolver<string | null, any, Context>
  values?: UpdateEnumValuesResolver<string[] | null, any, Context>
  type?: UpdateEnumTypeResolver<string, any, Context>
}

export type UpdateEnumNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateEnumNewNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateEnumValuesResolver<
  R = string[] | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateEnumTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface UpdateFieldResolvers<Context = any> {
  model?: UpdateFieldModelResolver<string, any, Context>
  name?: UpdateFieldNameResolver<string, any, Context>
  newName?: UpdateFieldNewNameResolver<string | null, any, Context>
  typeName?: UpdateFieldTypeNameResolver<string | null, any, Context>
  isRequired?: UpdateFieldIsRequiredResolver<boolean | null, any, Context>
  isList?: UpdateFieldIsListResolver<boolean | null, any, Context>
  unique?: UpdateFieldUniqueResolver<boolean | null, any, Context>
  relation?: UpdateFieldRelationResolver<string | null, any, Context>
  default?: UpdateFieldDefaultResolver<string | null, any, Context>
  enum?: UpdateFieldEnumResolver<string | null, any, Context>
  type?: UpdateFieldTypeResolver<string, any, Context>
}

export type UpdateFieldModelResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateFieldNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateFieldNewNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateFieldTypeNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateFieldIsRequiredResolver<
  R = boolean | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateFieldIsListResolver<
  R = boolean | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateFieldUniqueResolver<
  R = boolean | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateFieldRelationResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateFieldDefaultResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateFieldEnumResolver<R = string | null, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateFieldTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface UpdateModelResolvers<Context = any> {
  name?: UpdateModelNameResolver<string, any, Context>
  newName?: UpdateModelNewNameResolver<string, any, Context>
  type?: UpdateModelTypeResolver<string, any, Context>
}

export type UpdateModelNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateModelNewNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateModelTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface UpdateRelationResolvers<Context = any> {
  name?: UpdateRelationNameResolver<string, any, Context>
  newName?: UpdateRelationNewNameResolver<string | null, any, Context>
  modelAId?: UpdateRelationModelAIdResolver<string | null, any, Context>
  modelBId?: UpdateRelationModelBIdResolver<string | null, any, Context>
  type?: UpdateRelationTypeResolver<string, any, Context>
}

export type UpdateRelationNameResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateRelationNewNameResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateRelationModelAIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateRelationModelBIdResolver<
  R = string | null,
  Parent = any,
  Context = any
> = Resolver<R, Parent, Context>
export type UpdateRelationTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export interface UpdateSecretsResolvers<Context = any> {
  message?: UpdateSecretsMessageResolver<string, any, Context>
  type?: UpdateSecretsTypeResolver<string, any, Context>
}

export type UpdateSecretsMessageResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>
export type UpdateSecretsTypeResolver<R = string, Parent = any, Context = any> = Resolver<
  R,
  Parent,
  Context
>

export type AddProjectVariables = {
  name: string
  stage: string
}

export type AddProjectMutation = {
  __typename?: 'Mutation'
  addProject?: AddProjectAddProject | null
}

export type AddProjectAddProject = {
  __typename?: 'AddProjectPayload'
  clientMutationId?: string | null
}

export type DeployVariables = {
  projectName: string
  stage: string
  types: string
  secrets?: string[] | null
}

export type DeployMutation = {
  __typename?: 'Mutation'
  deploy?: DeployDeploy | null
}

export type DeployDeploy = {
  __typename?: 'DeployPayload'
  errors: DeployErrors[]
}

export type DeployErrors = {
  __typename?: 'SchemaError'
  description: string
}
