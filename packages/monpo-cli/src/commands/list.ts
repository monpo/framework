import { Runner } from '@monpo/core';
import { Printer } from '@hayspec/reporter';

/**
 * Lists package names.
 */
export default async function (argv) {
  const { packages } = argv;
  const printer = new Printer();

  const runner = new Runner({
    packages,
  });
  let names = await runner.scan();
  if (argv["smartsort"]) {
    names = await runner.smartsort(names);
  }
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
