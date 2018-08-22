import { Generator } from '@monpo/init';
import { Printer } from '@hayspec/reporter';

/**
 * Initializes project directory.
 */
export default async function (argv) {
  const root = process.cwd();
  const printer = new Printer();
  
  const generator = new Generator({ root });
  try {
    printer.end();
    await generator.build();

    printer.end(
      printer.colorize('cyanBright', `monpo `),
      printer.colorize('gray', `info `),
      `Continue by running the command below:`
    );
    printer.end(
      printer.colorize('cyanBright', `monpo `),
      printer.colorize('gray', `info `),
      `$ npm install`
    );

    printer.end();
    process.exit(0);
  } catch (e) {
    console.error(e);
  }
}
