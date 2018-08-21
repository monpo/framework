import { Runner } from '@monpo/core';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { packages, scope } = argv;
  const cmd = argv['_'].slice(1).join(' ');

  const runner = new Runner({
    packages,
    scope: scope.length ? scope : null,
  });
  const outputs = await runner.exec(cmd);
  
  console.log(outputs);
}
