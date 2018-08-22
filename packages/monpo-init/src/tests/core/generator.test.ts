import * as fsx from 'fs-extra';
import * as pth from 'path';
import { Spec } from '@hayspec/spec';
import { Generator } from '../..';

const spec = new Spec();

spec.test('builds project structure', async (ctx) => {
  const root = pth.join('node_modules', `.test${Date.now()}`);
  const generator = new Generator({ root });
  await generator.build();
  const pkg = pth.join(root, 'package.json');
  const src = JSON.parse(await fsx.readFile(pkg, 'utf8'));
  ctx.is(src.scripts.list, 'monpo list');
});

export default spec;
