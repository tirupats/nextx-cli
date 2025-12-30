const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function storeCmd(name, options) {
  const typescript = options.typescript !== false;
  const createFolder = options.folder || false;
  const withTest = options.withTest || false;
  const ext = typescript ? 'ts' : 'js';

  // Validate store name starts with "use"
  if (!/^use[A-Z]/.test(name)) {
    console.log(chalk.red('❌ Store name should start with "use" and be PascalCase'));
    return;
  }

  let basePath = path.join(process.cwd(), 'src', 'lib');
  if (createFolder) {
    basePath = path.join(basePath, name);
    fs.mkdirSync(basePath, { recursive: true });
  } else {
    fs.mkdirSync(basePath, { recursive: true });
  }

  const storeFile = path.join(basePath, `${name}.${ext}`);

  const template = typescript
    ? `import { createContext, useContext, useState } from 'react';

interface ${name}State {
  // Define your state here
  count: number;
  increment: () => void;
}

const ${name}Context = createContext<${name}State | undefined>(undefined);

export const ${name}Provider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const value = {
    count,
    increment: () => setCount(c => c + 1),
  };

  return <${name}Context.Provider value={value}>{children}</${name}Context.Provider>;
};

export const ${name} = () => {
  const context = useContext(${name}Context);
  if (!context) throw new Error('${name} must be used within a Provider');
  return context;
};
`
    : `import { createContext, useContext, useState } from 'react';

const ${name}Context = createContext();

export const ${name}Provider = ({ children }) => {
  const [count, setCount] = useState(0);

  const value = {
    count,
    increment: () => setCount(c => c + 1),
  };

  return <${name}Context.Provider value={value}>{children}</${name}Context.Provider>;
};

export const ${name} = () => {
  const context = useContext(${name}Context);
  if (!context) throw new Error('${name} must be used within a Provider');
  return context;
};
`;

  fs.writeFileSync(storeFile, template);
  console.log(chalk.green(`✅ Store created at ${storeFile}`));

  // Optional test file
  if (withTest) {
    const testFile = path.join(basePath, `${name}.test.${ext}`);
    const testTemplate = `import { renderHook } from '@testing-library/react-hooks';
import { ${name}Provider, ${name} } from './${name}';

test('store should initialize correctly', () => {
  const wrapper = ({ children }) => <${name}Provider>{children}</${name}Provider>;
  const { result } = renderHook(() => ${name}(), { wrapper });
  expect(result.current.count).toBe(0);
});\n`;
    fs.writeFileSync(testFile, testTemplate);
    console.log(chalk.green(`✅ Test created at ${testFile}`));
  }
};
