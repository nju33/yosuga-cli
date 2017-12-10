import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';

export default async () => {
  const pkgDirname = await pkgDir(process.cwd());

  if (!pkgDirname) {
    console.log('ERR!');
    process.exit(1);
  }

  const pkgname = path.join(pkgDirname, 'package.json');
  return {
    pkgDirname,
    pkgname,
    pkg: await fs.readJson(pkgname),
  };
}
