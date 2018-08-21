import { Spec } from '@hayspec/spec';
import * as init from '../..';

const spec = new Spec();

spec.test('exposes Generator class', async (ctx) => {
  ctx.true(!!init.Generator);
});

export default spec;
