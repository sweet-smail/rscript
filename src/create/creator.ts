import fs from 'fs-extra';
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');
interface IFile {
  contents: Buffer | NodeJS.ReadableStream | null;
  cwd: string;
  base: string | null | undefined;
  history: string[];
  relative: string;
  dirname: string;
  basename: string;
  stem: string;
  extname: string;
  symlink: string;
  stat: fs.Stats | null;
}

interface IReadOptions {
  raw?: boolean;
}

interface IAppendOptions {
  trimEnd?: boolean;
  separator?: string;
}

class Creator {
  fs: any;
  constructor() {
    const store = memFs.create();
    this.fs = memFsEditor.create(store);
  }
  template() {}
}
export default Creator;
