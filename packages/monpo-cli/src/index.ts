import * as yargs from 'yargs';
import * as pth from 'path';
import initHandler from './commands/init';
import listHandler from './commands/list';
import execHandler from './commands/exec';
import configureHandler from './commands/configure';

/**
 * Interface definition.
 */
const { argv } = yargs
  .usage('Usage: $0 --help')
  .command('init', 'Initialize directory',  (yargs) => yargs
   .usage('Usage: $0'),
    initHandler)
  .command('list', 'List packages', (yargs) => yargs
    .usage('Usage: $0')
    .option('packages', {
      string: true,
      description: 'Main directory path',
      default: pth.join(process.cwd(), 'packages'),
    }),
    listHandler)
  .command('exec', 'Run an arbitrary command in each package', (yargs) => yargs
    .usage('Usage: $0 -- npm run transpile')
    .option('packages', {
      string: true,
      description: 'Main directory path',
      default: pth.join(process.cwd(), 'packages'),
    })
    .option('scope', {
      array: true,
      description: 'Included packages',
      default: [],
    }),
    execHandler)
  .command('configure', 'Configure package.json in each package', (yargs) => yargs
    .usage('Usage: $0 --key version --value 1.0.0')
    .option('packages', {
      string: true,
      description: 'Main directory path',
      default: pth.join(process.cwd(), 'packages'),
    })
    .option('scope', {
      array: true,
      description: 'Included packages',
      default: [],
    })
    .option('key', {
      string: true,
      description: 'Property name',
      default: null,
    })
    .option('value', {
      description: 'Property value',
      default: null,
    }),
    configureHandler)
  .epilog('Copyright © Xpepermint 2018.')
  .help()
  .version();

/**
 * Upgrading environment.
 */
if (Array.isArray(argv.require)) {
  argv.require.forEach((v) => require(v));
}
