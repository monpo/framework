/**
 * File recipe interface.
 */
export interface FileRecipe {
  path: string[];
  content: string[];
}

/**
 * Project files.
 */
export const files = [
  {
    path: ['.gitignore'],
    content: [
      `.DS_Store`,
      `.vscode`,
      `node_modules`
    ],
  },
  {
    path: ['package.json'],
    content: [
      `{`,
      `  "scripts": {`,
      `    "exec": "monpo exec",`,
      `    "list": "monpo list",`,
      `    "test": "monpo exec -- npm run test"`,
      `  },`,
      `  "devDependencies": {`,
      `    "@monpo/cli": "latest"`,
      `  }`,
      `}`,
    ],
  },
  {
    path: ['packages', '.keep'],
    content: [],
  },
] as FileRecipe[];
