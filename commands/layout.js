const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function layoutCmd(name, options) {
  const typescript = options.typescript !== false;
  const withTest = options.withTest || false;
  const withStyles = options.withStyles || false;
  const createFolder = options.folder !== false; // default true
  const ext = typescript ? 'tsx' : 'jsx';

  // Validate PascalCase
  if (!/^[A-Z][A-Za-z0-9]+$/.test(name)) {
    console.log(chalk.red('❌ Layout name should be PascalCase'));
    return;
  }

  let basePath = path.join(process.cwd(), 'layouts');
  if (createFolder) {
    basePath = path.join(basePath, name);
    fs.mkdirSync(basePath, { recursive: true });
  } else {
    fs.mkdirSync(basePath, { recursive: true });
  }

  const layoutFile = path.join(basePath, `${name}.${ext}`);

  const template = `import React from 'react';
${withStyles ? `import styles from './${name}.module.css';\n` : ''}

interface ${name}Props {
  children: React.ReactNode;
}

const ${name}: React.FC<${name}Props> = ({ children }) => {
  return (
    <div${withStyles ? ` className={styles.${name}}` : ''}>
      {children}
    </div>
  );
};

export default ${name};
`;

  fs.writeFileSync(layoutFile, template);
  console.log(chalk.green(`✅ Layout created at ${layoutFile}`));

  // Optional test
  if (withTest) {
    const testFile = path.join(basePath, `${name}.test.${ext}`);
    const testTemplate = `import { render } from '@testing-library/react';
import ${name} from './${name}';

test('renders ${name} layout', () => {
  render(<${name}>Content</${name}>);
});
`;
    fs.writeFileSync(testFile, testTemplate);
    console.log(chalk.green(`✅ Test created at ${testFile}`));
  }

  // Optional styles
  if (withStyles) {
    const styleFile = path.join(basePath, `${name}.module.css`);
    const styleTemplate = `.${name} {
  /* Add layout styles here */
}
`;
    fs.writeFileSync(styleFile, styleTemplate);
    console.log(chalk.green(`✅ Stylesheet created at ${styleFile}`));
  }
};
