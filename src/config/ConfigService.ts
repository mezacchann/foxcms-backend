import * as Joi from 'joi'
import * as fs from 'fs'
import * as dotenv from 'dotenv'
export interface EnvConfig {
  [key: string]: string
}

export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor(filePath: string) {
    const config = dotenv.parse(fs.readFileSync(filePath))
    this.envConfig = this.validateInput(config)
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid(['development', 'production', 'test'])
        .default('development'),
      PRISMA_SERVER: Joi.string().required(),
      FOXCMS_SECRET: Joi.string().required(),
      PRISMA_MANAGEMENT_API_SECRET: Joi.string().required(),
      UPLOAD_DIR: Joi.string().required(),
      TEST_USER: Joi.string().default('peter'),
    })

    const { error, value: validatedEnvConfig } = Joi.validate(envConfig, envVarsSchema)
    if (error) {
      throw new Error(`Config validation error: ${error.message}`)
    }
    return validatedEnvConfig
  }

  get nodeEnv(): string {
    return String(this.envConfig.NODE_ENV)
  }

  get prismaServer(): string {
    return String(this.envConfig.PRISMA_SERVER)
  }

  get foxCmsSecret(): string {
    return String(this.envConfig.FOXCMS_SECRET)
  }

  get prismaManagementSecret(): string {
    return String(this.envConfig.PRISMA_MANAGEMENT_API_SECRET)
  }

  get uploadDir(): string {
    return String(this.envConfig.UPLOAD_DIR)
  }

  get testUser(): string {
    return String(this.envConfig.TEST_USER)
  }
}
