import { SchemaError } from './SchemaError'
import { SchemaWarning } from './SchemaWarning'

export interface DeployPayload {
  errors: SchemaError[]
  warnings: SchemaWarning[]
}
