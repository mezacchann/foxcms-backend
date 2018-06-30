import * as util from 'util';
import * as fs from 'fs';

const readFile = util.promisify(fs.readFile);
export const dataModels = [
  {
    provide: 'PrismaDatamodel',
    useFactory: async () => {
      const fileContent = await readFile('./prisma/datamodel.graphql');
      return fileContent;
    },
  },
  {
    provide: 'ContentTypesDatamodel',
    useFactory: async () => {
      const fileContent = await readFile('./prisma/contentTypes.graphql');
      return fileContent;
    },
  },
];
