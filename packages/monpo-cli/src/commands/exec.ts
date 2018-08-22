import { Runner } from '@monpo/core';
import { Printer } from '@hayspec/reporter';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { packages, scope } = argv;
  const cmd = argv['_'].slice(1).join(' ');
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
        printer.colorize('gray', `exec ${JSON.stringify(cmd)}`)
      );
    });
    printer.end();
    await runner.exec(cmd);
  }

  printer.end(
    printer.indent(1, ''),
    printer.colorize(count ? 'greenBright' : 'redBright', count),
    ' executed'
  );
  printer.end();
}
