import { promisify } from 'util';
import * as readYaml from 'read-yaml-promise';

export const endpointProvider = {
  provide: 'PrismaEndpoint',
  useFactory: async () => {
    const prismaConfig = await readYaml('./prisma/prisma.yml');
    return prismaConfig.endpoint;
  },
};