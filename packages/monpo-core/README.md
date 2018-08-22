```ts
import { Runner } from '@monpo/core';

const runner = new Runner({
  packages: '/Users/foo/packages',
  scope: ['@monpo/cli'],
});

runner.exec({
  cmd: 'npm install',
});

runner.publish({
  version: '1.0.1',
});
```
