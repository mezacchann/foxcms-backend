import * as util from 'util';
import * as fs from 'fs';

const readFile = util.promisify(fs.readFile);
export const dataModel = {
  provide: 'PrismaDatamodel',
  useFactory: async () => {
    const fileContent = await readFile('./prisma/datamodel.graphql');
    return fileContent;
  },
};
