import * as util from 'util';
import * as cproc from 'child_process';

/**
 * Promisified command-line executor.
 */
export const exec = util.promisify(cproc.exec);
