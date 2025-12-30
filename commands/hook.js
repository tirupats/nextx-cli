const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function hookCmd(name, options) {
  const typescript = options.typescript !== false;
  const withTest = options.withTest || false;
  const createFolder = options.folder || false;
  const ext = typescript ? 'ts' : 'js';

  // Validate hook name
  if (!/^use[A-Z]/.test(name)) {
    console.log(chalk.red('❌ Hook name should start with "use" and be PascalCase'));
    return;
  }

  let basePath = path.join(process.cwd(), 'hooks');
  if (createFolder) {
    basePath = path.join(basePath, name);
    fs.mkdirSync(basePath, { recursive: true });
  } else {
    fs.mkdirSync(basePath, { recursive: true });
  }

  const hookFile = createFolder ? path.join(basePath, `${name}.${ext}`) : path.join(basePath, `${name}.${ext}`);

  const template = `import { useState, useEffect } from 'react';

export function ${name}() {
  const [state, setState] = useState(null);

  useEffect(() => {
    // Your hook logic here
  }, []);

  return state;
}
`;

  fs.writeFileSync(hookFile, template);
  console.log(chalk.green(`✅ Hook created at ${hookFile}`));

  // Optional test
  if (withTest) {
    const testFile = path.join(basePath, `${name}.test.${ext}`);
    const testTemplate = `import { renderHook } from '@testing-library/react-hooks';
import { ${name} } from './${name}';

test('should use ${name}', () => {
  const { result } = renderHook(() => ${name}());
  expect(result.current).toBeDefined();
});
`;
    fs.writeFileSync(testFile, testTemplate);
    console.log(chalk.green(`✅ Test created at ${testFile}`));
  }
};
