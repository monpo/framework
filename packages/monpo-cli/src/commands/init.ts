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
      printer.indent(1, ''),
      `Continue by running the command below:`
    );
    printer.end(
      printer.indent(2, ''),
      printer.colorize('gray', `$ npm install`)
    );
    printer.end();

  } catch (e) {
    console.error(e);
  }
}
