/* @flow */
import prettier from 'prettier';

export default (pkg: {name: string, description: string}) => {
  return prettier.format(`
    module.exports = {
      name: '${pkg.name || ''}',
      description: '${pkg.description || ''}',
      port: 3333,
      main: 'css',
      dirs: {
        yosuga: 'yosuga',
        css: 'css',
        postcss: 'postcss',
        sass: 'sass',
        less: 'less',
        stylus: 'stylus',
      },
      style: {
        fontSize: '14px',
        accentColor: '#cb1b45',
      },
      generate: {
        dir: 'docs',
      },
    }
  `, {
    semi: true,
    singleQuote: true,
    trailingComma: true,
  });
}
