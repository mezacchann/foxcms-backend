export const endpointProvider = {
  provide: 'PrismaEndpoint',
  useFactory: async () => {
    return process.env.PRISMA_SERVER_ENDPOINT
  },
}
