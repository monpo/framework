import { Runner } from '@monpo/core';
import { Printer } from '@hayspec/reporter';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { packages, scope, key, value } = argv;
  const printer = new Printer();

  const runner = new Runner({
    packages,
    scope: scope.length ? scope : null,
  });
  const names = await runner.gether();
  const count = names.length;

  if (count) {
    names.forEach((name) => {
      printer.end(
        printer.indent(1, ''),
        name,
        ' ', 
        printer.colorize('gray', `set ${key}=${value}`)
      );
    });
    printer.end();
    await runner.configure(key.split('.'), value);
  }

  printer.end(
    printer.indent(1, ''),
    printer.colorize(count ? 'greenBright' : 'redBright', count),
    ' configured'
  );
  printer.end();
}
