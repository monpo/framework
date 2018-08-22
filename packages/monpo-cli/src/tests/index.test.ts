import * as pth from 'path';
import * as util from 'util';
import * as cproc from 'child_process';
import * as fs from 'fs-extra';
import { Spec } from '@hayspec/spec';

const exec = util.promisify(cproc.exec);
const cwd = pth.join(process.cwd(), 'src', 'tests', 'assets');

const spec = new Spec();

spec.test('initializes current folder', async (ctx) => {
  const command = `mkdir -p ./node_modules/.tmp/test; cd ./node_modules/.tmp/test; ../../../bin/monpo init`;
  const { stdout, stderr } = await exec(command);
  ctx.not(stdout.indexOf('Continue by running the command below:'), -1);
  ctx.is(stderr, '');
});

spec.test('lists package names', async (ctx) => {
  const command = `../../../bin/monpo list`;
  const { stdout, stderr } = await exec(command, { cwd });
  ctx.not(stdout.indexOf('test0'), -1);
  ctx.not(stdout.indexOf('test1'), -1);
  ctx.is(stderr, '');
});

spec.test('executes a command in each package', async (ctx) => {
  const command = `../../../bin/monpo exec npm run echo`;
  const { stdout, stderr } = await exec(command, { cwd });
  ctx.not(stdout.indexOf('monpo test0 cmd exec "npm run echo"'), -1);
  ctx.not(stdout.indexOf('monpo test1 cmd exec "npm run echo"'), -1);
  ctx.is(stderr, '');
});

spec.test('executes a command in scoped package only', async (ctx) => {
  const command = `../../../bin/monpo exec --scope test1 -- npm run echo`;
  const { stdout, stderr } = await exec(command, { cwd });
  ctx.is(stdout.indexOf('monpo test0 cmd exec "npm run echo"'), -1);
  ctx.not(stdout.indexOf('monpo test1 cmd exec "npm run echo"'), -1);
  ctx.is(stderr, '');
});

spec.test('configures package.json in each package', async (ctx) => {
  const value = Date.now();
  const command = `../../../bin/monpo configure --key foo.bar --value ${value}`;
  const { stderr } = await exec(command, { cwd });
  const test0 = JSON.parse(await fs.readFile(pth.join(cwd, 'packages', 'test0', 'package.json'), 'utf8'));
  const test1 = JSON.parse(await fs.readFile(pth.join(cwd, 'packages', 'test1', 'package.json'), 'utf8'));
  ctx.is(test0.foo.bar, value);
  ctx.is(test1.foo.bar, value);
  ctx.is(stderr, '');
});

spec.test('configures package.json in scoped package only', async (ctx) => {
  const value = Date.now();
  const command = `../../../bin/monpo configure --scope test1 --key foo.bar --value ${value}`;
  const { stderr } = await exec(command, { cwd });
  const test0 = JSON.parse(await fs.readFile(pth.join(cwd, 'packages', 'test0', 'package.json'), 'utf8'));
  const test1 = JSON.parse(await fs.readFile(pth.join(cwd, 'packages', 'test1', 'package.json'), 'utf8'));
  ctx.not(test0.foo.bar, value);
  ctx.is(test1.foo.bar, value);
  ctx.is(stderr, '');
});

export default spec;
