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
  const names = await runner.gether();
  const count = names.length;

  if (count) {
    names.forEach((name) => {
      printer.end(
        printer.indent(1, ''),
        name
      );
    });
    printer.end();
  }

  printer.end(
    printer.indent(1, ''),
    printer.colorize(count ? 'greenBright' : 'redBright', count),
    ' found'
  );
  printer.end();
}
