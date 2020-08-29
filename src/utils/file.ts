import fs from 'fs-extra';
export const isExitsFile = (fileName: string) => {
  return fs.existsSync(fileName);
};
