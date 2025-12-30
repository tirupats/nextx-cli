const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function componentCmd(name, options) {
  const typescript = options.typescript !== false; // default true
  const withTest = options.withTest || false;
  const withStyles = options.withStyles || false;
  const functional = options.functional !== false; // default true
  const createFolder = options.folder || false;

  // Determine file extension
  const ext = typescript ? 'tsx' : 'jsx';

  // Determine base path
  let basePath = path.join(process.cwd(), 'components');
  if (createFolder) {
    basePath = path.join(basePath, name);
    fs.mkdirSync(basePath, { recursive: true });
  } else {
    fs.mkdirSync(basePath, { recursive: true }); // ensure components folder exists
  }

  // Component filename
  const componentFile = createFolder ? path.join(basePath, `${name}.${ext}`) : path.join(basePath, `${name}.${ext}`);

  // Component template
  let componentTemplate = '';

  if (functional) {
    componentTemplate = `import React from 'react';
${withStyles ? `import styles from './${name}.module.css';\n` : ''}

interface ${name}Props {
  // Add props here
}

const ${name}: React.FC<${name}Props> = (props) => {
  return (
    <div${withStyles ? ` className={styles.${name}}` : ''}>
      ${name} component
    </div>
  );
};

export default ${name};
`;
  } else {
    // Class component
    componentTemplate = `import React, { Component } from 'react';
${withStyles ? `import styles from './${name}.module.css';\n` : ''}

interface ${name}Props {
  // Add props here
}

interface ${name}State {
  // Add state here
}

class ${name} extends Component<${name}Props, ${name}State> {
  state: ${name}State = {};
  
  render() {
    return (
      <div${withStyles ? ` className={styles.${name}}` : ''}>
        ${name} component
      </div>
    );
  }
}

export default ${name};
`;
  }

  fs.writeFileSync(componentFile, componentTemplate);
  console.log(chalk.green(`✅ Component created at ${componentFile}`));

  // Optional test file
  if (withTest) {
    const testFile = path.join(basePath, `${name}.test.${ext}`);
    const testTemplate = `import { render } from '@testing-library/react';
import ${name} from './${name}';

test('renders ${name} component', () => {
  render(<${name} />);
});
`;
    fs.writeFileSync(testFile, testTemplate);
    console.log(chalk.green(`✅ Test created at ${testFile}`));
  }

  // Optional styles file
  if (withStyles) {
    const styleFile = path.join(basePath, `${name}.module.css`);
    const styleTemplate = `.${name} {
  /* Add your styles here */
}
`;
    fs.writeFileSync(styleFile, styleTemplate);
    console.log(chalk.green(`✅ Stylesheet created at ${styleFile}`));
  }
};
