import * as util from 'util';
import * as cproc from 'child_process';

/**
 * 
 */
export const exec = util.promisify(cproc.exec);
