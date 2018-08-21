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
      `    "exec": "monpa exec",`,
      `    "list": "monpa list",`,
      `    "test": "monpa exec -- npm run test"`,
      `  },`,
      `  "devDependencies": {`,
      `    "@monpa/cli": "latest"`,
      `  }`,
      `}`,
    ],
  },
  {
    path: ['packages', '.keep'],
    content: [],
  },
] as FileRecipe[];
