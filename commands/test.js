const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function testCmd(name, options) {
  const typescript = options.typescript !== false;
  const testType = options.type || 'component';
  const targetPath = options.path
    ? path.resolve(process.cwd(), options.path)
    : process.cwd();

  if (!fs.existsSync(targetPath)) fs.mkdirSync(targetPath, { recursive: true });

  const ext = typescript ? (testType === 'hook' || testType === 'store' ? 'ts' : 'tsx') : (testType === 'hook' || testType === 'store' ? 'js' : 'jsx');
  const testFile = path.join(targetPath, `${name}.test.${ext}`);

  let template = '';

  switch (testType) {
    case 'component':
      template = `import { render, screen } from '@testing-library/react';
import ${name} from './${name}';

test('renders ${name} component', () => {
  render(<${name} />);
  expect(screen.getByText(/./)).toBeInTheDocument();
});
`;
      break;

    case 'hook':
      template = `import { renderHook } from '@testing-library/react-hooks';
import { ${name} } from './${name}';

test('hook ${name} works', () => {
  const { result } = renderHook(() => ${name}());
  expect(result.current).toBeDefined();
});
`;
      break;

    case 'store':
      template = `import { renderHook } from '@testing-library/react-hooks';
import { ${name}Provider, ${name} } from './${name}';

test('store ${name} initializes', () => {
  const wrapper = ({ children }) => <${name}Provider>{children}</${name}Provider>;
  const { result } = renderHook(() => ${name}(), { wrapper });
  expect(result.current).toBeDefined();
});
`;
      break;

    case 'page':
    case 'layout':
      template = `import { render, screen } from '@testing-library/react';
import ${name} from './${name}';

test('${name} renders correctly', () => {
  render(<${name} />);
  expect(screen.getByText(/./)).toBeInTheDocument();
});
`;
      break;

    default:
      console.log(chalk.red('❌ Invalid test type. Use component, hook, store, page, or layout.'));
      return;
  }

  fs.writeFileSync(testFile, template);
  console.log(chalk.green(`✅ Test file created at ${testFile}`));
};
