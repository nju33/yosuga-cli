#!/usr/bin/env node
/* @flow */
import fs from 'fs-extra';
import path from 'path';
import pkgDir from 'pkg-dir';
import yargs from 'yargs';
import Yosuga from 'yosuga';
import prettier from 'prettier';
import createConfigCode from './create-config-code';
import getPkg from './get-pkg';

(async () => {
  return yargs
    .command('init', 'init', command => {
      return command.help();
    }, async args => {
      const {pkg, pkgDirname} = await getPkg();
      const configname = path.join(pkgDirname, 'yosuga.config.js');
      const configCode = createConfigCode(pkg);
      await fs.writeFile(configname, configCode);
      console.log('`yosuga.config.`Created');
    })
    .command('serve', 'serve', command => {
      return command.help();
    }, async args => {
      const {pkgDirname} = await getPkg();
      const configname = path.join(pkgDirname, 'yosuga.config.js');
      let config;
      try {
        // $FlowFixMe
        config = require(configname);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }

      const yosuga = new Yosuga(config)
      await yosuga.prepare();
      yosuga.serve();
    })
    .command('generate', 'generate', command => {
      return command
        .option('base', {
          alias: 'b',
          type: 'string',
          default: '/',
        })
        .help();
    }, async args => {
      const {pkgDirname} = await getPkg();
      const configname = path.join(pkgDirname, 'yosuga.config.js');
      let config;
      try {
        // $FlowFixMe
        config = require(configname);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }

      process.env.NODE_ENV = 'production';
      const yosuga = new Yosuga(config)
      await yosuga.prepare();
      await yosuga.generate(args.base);
    })
    .argv;
})().catch(err => {
  console.log(err)
  process.exit(1);
})
