import * as pth from 'path';
import * as glob from 'fast-glob';
import * as proc from '../lib/child-process';
import * as fs from 'fs-extra';
import * as dobj from 'object-path';

/**
 * Runner options.
 */
export interface RunnerConfig {
  packages?: string;
  scope?: string[];
  verbose?: boolean;
}

/**
 * Package runner.
 */
export class Runner {
  protected config: RunnerConfig;

  /**
   * Class constructor.
   */
  public constructor(config?: RunnerConfig) {
    this.config = {
      packages: pth.join(process.cwd(), 'packages'),
      scope: null,
      ...config,
    };
  }

  /**
   * Executes a command inside the projects.
   */
  public async exec(cmd: string) {
    const names = await this.gether();
    const outputs = [];

    for (const name of names) {
      const { stdout, stderr } = await proc.exec(cmd, {
        cwd: pth.join(this.config.packages, name),
      });

      if (stderr) {
        throw stderr;
      } else {
        outputs.push(stdout);
      }
    }

    return outputs as string[];
  }

  /**
   * Configures package.json files inside the projects.
   */
  public async configure(path: string[], value: any) {
    const names = await this.gether();
    
    for (const name of names) {
      let file = pth.join(this.config.packages, name, 'package.json');
      let data = await fs.readFile(file, 'utf8');
      let json = JSON.parse(data);

      dobj.set(json, path, value);

      const src = JSON.stringify(json, null, 2);
      await fs.writeFile(file, src, 'utf8');
    }
  }

  /**
   * Returns monorepo package names based on global class scope.
   */
  public async gether() {
    const match = pth.join(this.config.packages, '*')
    const dirs = await glob(match, { onlyDirectories: true }) as string[];

    const names = dirs.map((d) => d.split(/\\|\//).reverse()[0]);
    if (Array.isArray(this.config.scope)) {
      return names.filter((n) => this.config.scope.indexOf(n) !== -1);
    } else {
      return names;
    }
  }

}
