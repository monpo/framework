import { Runner } from '@monpo/core';

/**
 * Lists package names.
 */
export default async function (argv) {
  const { packages } = argv;
  const cmd = argv['_'].slice(1).join(' ');

  const runner = new Runner({
    packages,
  });
  const names = await runner.gether();

  console.log(names);
}
