import * as pth from 'path';
import * as fs from 'fs-extra';
import { Spec } from '@hayspec/spec';
import { Runner } from '../..';

const packages = pth.join(process.cwd(), 'src', 'tests', 'assets', 'packages');

const spec = new Spec();

spec.test('method `scan()` returns list of packages', async (ctx) => {
  const runner = new Runner({ packages });
  const names = await runner.scan();
  ctx.deepEqual(names, ['test0', 'test1']);
});

spec.test('method `scan()` returns scoped list of packages', async (ctx) => {
  const scope = ['test1'];
  const runner = new Runner({ packages, scope });
  const names = await runner.scan();
  ctx.deepEqual(names, ['test1']);
});

spec.test('method `exec()` executes a command inside a package', async (ctx) => {
  const runner = new Runner({ packages });
  const output = await runner.exec('test1', 'npm run echo');
  ctx.not(output.stdout.indexOf('0xd8q1271ga'), -1);
  ctx.is(output.stderr, '');
});

spec.test('method `exec()` throws on error', async (ctx) => {
  const runner = new Runner({ packages });
  ctx.throws(() => runner.exec('test1', 'npm run foo'));
});

spec.test('method `configure()` sets package.json data for a package', async (ctx) => {
  const runner = new Runner({ packages });
  const value = Date.now();
  await runner.configure('test0', ['baz'], value);
  await runner.configure('test1', ['foo', 'bar'], value);
  const json = [
    JSON.parse(await fs.readFile(pth.join(packages, 'test0', 'package.json'), 'utf8')),
    JSON.parse(await fs.readFile(pth.join(packages, 'test1', 'package.json'), 'utf8')),
  ];
  ctx.is(json[0].baz, value);
  ctx.is(json[1].foo.bar, value);
});

export default spec;
