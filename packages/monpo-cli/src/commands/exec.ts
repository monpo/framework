import { Runner } from '@monpo/core';
import { Printer } from '@hayspec/reporter';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const { packages, scope, verbose } = argv;
  const cmd = argv['_'].slice(1).join(' ');
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
      printer.colorize('greenBright', `cmd `),
      `exec ${JSON.stringify(cmd)}`
    );
    const output = await runner.exec(name, cmd);
    output.stdout.split(/\n/).forEach((line) => {
      printer.end(
        printer.colorize('cyanBright', `monpo `),
        `${name} `,
        printer.colorize('gray', `stdout `),
        line
      );
    });
    output.stderr.split(/\n/).forEach((line) => {
      printer.end(
        printer.colorize('cyanBright', `monpo `),
        `${name} `,
        printer.colorize('redBright', `stderr `),
        line
      );
    });
  }
  printer.end(
    printer.colorize('cyanBright', `monpo `),
    printer.colorize(count ? 'greenBright' : 'redBright', count),
    ' executed'
  );
  printer.end();
  process.exit(0);
}
