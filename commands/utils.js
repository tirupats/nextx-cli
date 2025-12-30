const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function utilsCmd(name, options) {
  const typescript = options.typescript !== false;
  const createFolder = options.folder || false;
  const withTest = options.withTest || false;
  const ext = typescript ? 'ts' : 'js';

  let basePath = path.join(process.cwd(), 'src', 'lib');
  if (createFolder) {
    basePath = path.join(basePath, name);
    fs.mkdirSync(basePath, { recursive: true });
  } else {
    fs.mkdirSync(basePath, { recursive: true });
  }

  const utilsFile = path.join(basePath, `${name}.${ext}`);

  const template = typescript
    ? `// Utility: ${name}
export const ${name} = () => {
  // TODO: implement helper logic
};
`
    : `// Utility: ${name}
export const ${name} = () => {
  // TODO: implement helper logic
};
`;

  fs.writeFileSync(utilsFile, template);
  console.log(chalk.green(`✅ Utility created at ${utilsFile}`));

  // Optional test file
  if (withTest) {
    const testFile = path.join(basePath, `${name}.test.${ext}`);
    const testTemplate = typescript
      ? `import { ${name} } from './${name}';

test('${name} should exist', () => {
  expect(${name}).toBeDefined();
});
`
      : `import { ${name} } from './${name}';

test('${name} should exist', () => {
  expect(${name}).toBeDefined();
});
`;
    fs.writeFileSync(testFile, testTemplate);
    console.log(chalk.green(`✅ Test created at ${testFile}`));
  }
};
