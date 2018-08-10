export interface JwtPayload {
  id: number
  username: string
  password: string
  imageUri?: string
  projects: any[]
}
