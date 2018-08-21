import * as pth from 'path';
import * as fs from 'fs-extra';
import { Spec } from '@hayspec/spec';
import { Runner } from '../..';

const packages = pth.join(process.cwd(), 'src', 'tests', 'assets', 'packages');

const spec = new Spec();

spec.test('method `gether()` returns list of packages', async (ctx) => {
  const runner = new Runner({ packages });
  const names = await runner.gether();
  ctx.deepEqual(names, ['test0', 'test1']);
});

spec.test('method `gether()` returns scoped list of packages', async (ctx) => {
  const scope = ['test1'];
  const runner = new Runner({ packages, scope });
  const names = await runner.gether();
  ctx.deepEqual(names, ['test1']);
});

spec.test('method `exec()` executes a command inside each package', async (ctx) => {
  const runner = new Runner({ packages });
  const outputs = await runner.exec('npm run echo').then((o) => o.join(' '));
  ctx.not(outputs.indexOf('0xdfh3271ga'), -1);
  ctx.not(outputs.indexOf('0xd8q1271ga'), -1);
});

spec.test('method `exec()` throws on error', async (ctx) => {
  const runner = new Runner({ packages });
  ctx.throws(() => runner.exec('npm run foo'));
});

spec.test('method `configure()` sets package.json data for each package', async (ctx) => {
  const runner = new Runner({ packages });
  const value = Date.now();
  await runner.configure(['baz'], value);
  await runner.configure(['foo', 'bar'], value);
  const json = [
    JSON.parse(await fs.readFile(pth.join(packages, 'test0', 'package.json'), 'utf8')),
    JSON.parse(await fs.readFile(pth.join(packages, 'test1', 'package.json'), 'utf8')),
  ];
  ctx.is(json[0].foo.bar, value);
  ctx.is(json[0].baz, value);
  ctx.is(json[1].foo.bar, value);
  ctx.is(json[1].baz, value);
});

export default spec;
