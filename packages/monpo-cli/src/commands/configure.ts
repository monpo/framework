import { Runner } from '@monpo/core';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { packages, scope, key, value } = argv;
  const cmd = argv['_'].slice(1).join(' ');

  const runner = new Runner({
    packages,
    scope: scope.length ? scope : null,
  });
  const outputs = await runner.configure(key.split('.'), value);
  
  console.log(outputs);
}
