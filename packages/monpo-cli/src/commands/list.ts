import { Runner } from '@monpo/core';
import { Printer } from '@hayspec/reporter';

/**
 * Lists package names.
 */
export default async function (argv) {
  const { smartsort, packages } = argv;
  const printer = new Printer();

  const runner = new Runner({
    packages,
    smartsort,
  });
  const names = await runner.scan();
  const count = names.length;

  printer.end();
  if (count) {
    names.forEach((name) => {
      printer.end(
        printer.colorize('cyanBright', `monpo `),
        printer.colorize('gray', `result `),
        `${name} `
      );
    });
  }
  printer.end(
    printer.colorize('cyanBright', `monpo `),
    printer.colorize(count ? 'greenBright' : 'redBright', count),
    ' found'
  );
  printer.end();
  process.exit(0);
}
