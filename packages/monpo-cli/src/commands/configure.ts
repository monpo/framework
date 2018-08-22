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
  const names = await runner.scan();
  const count = names.length;

  printer.end();
  for (const name of names) {
    printer.end(
      printer.colorize('cyanBright', `monpo `),
      `${name} `,
      printer.colorize('gray', `config `),
      `${key}=${value}`
    );
    try {
      await runner.configure(name, key.split('.'), value);
    } catch (e) {
      printer.end(
        printer.colorize('cyanBright', `monpo `),
        `${name} `,
        printer.colorize('redBright', `stderr `),
        e.message
      );
    }
  }

  printer.end(
    printer.colorize('cyanBright', `monpo `),
    printer.colorize(count ? 'greenBright' : 'redBright', count),
    ' configured'
  );
  printer.end();
  process.exit(0);
}
