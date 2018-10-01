import * as pth from 'path';
import * as glob from 'fast-glob';
import * as proc from '../lib/child-process';
import * as fs from 'fs-extra';
import * as dobj from 'object-path';
import * as dgraph from 'dependency-graph';

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
  public async exec(name: string, cmd: string) {
    return await proc.exec(cmd, {
      cwd: pth.join(this.config.packages, name),
    });
  }

  /**
   * Configures package.json files inside the projects.
   */
  public async configure(name: string, path: string[], value: any) {
    let file = pth.join(this.config.packages, name, 'package.json');
    let data = await fs.readFile(file, 'utf8');
    let json = JSON.parse(data);

    dobj.set(json, path, value);

    const src = JSON.stringify(json, null, 2);
    await fs.writeFile(file, src, 'utf8');

    return json;
  }

  /**
   * Returns monorepo package names based on global class scope.
   */
  public async scan() {
    const match = pth.join(this.config.packages, '*')
    const dirs = await glob(match, { onlyDirectories: true }) as string[];
    dirs.sort();

    const names = dirs.map((d) => d.split(/\\|\//).reverse()[0]);
    if (Array.isArray(this.config.scope)) {
      return names.filter((n) => this.config.scope.indexOf(n) !== -1);
    } else {
      return names;
    }
  }

  /**
   * Returns monorepo package names based on dependencies.
   */
  public async smartsort(names: string[]) {
    const paths = names.map((n) => pth.join(this.config.packages, n, 'package.json'));
    const depGroups = await Promise.all(
      paths.map(async path => {
        const conf = JSON.parse(await fs.readFile(path, 'utf8'));
        const a1 = 'dependencies' in conf ? Object.keys(conf['dependencies']) : [];
        const a2 = 'devDependencies' in conf ? Object.keys(conf['devDependencies']) : [];
        const name = path.split(/\\|\//).reverse()[1];
        return { name: name, dependencies: a1.concat(a2) };
      })
    );
    const graph = new dgraph.DepGraph();

    for (const depGroup of depGroups) {
      graph.addNode(depGroup['name']);
    }
    for (const depGroup of depGroups) {
      for (const dep of depGroup['dependencies']) {
        if (graph.hasNode(dep)) {
          graph.addDependency(depGroup['name'], dep);
        }
      }
    }
    names = graph.overallOrder();
    if (Array.isArray(this.config.scope)) {
      names = names.filter((n) => this.config.scope.indexOf(n) !== -1);
    }
    return names;
  }


}
