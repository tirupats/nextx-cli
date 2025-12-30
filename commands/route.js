const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function routeCmd(name, options) {
  // Options
  const layout = options.layout || 'default';
  const typescript = options.typescript !== false; // default true
  const withTest = options.withTest || false;
  const withApi = options.withApi || false;

  // Build route path
  const routePath = path.join(process.cwd(), 'app', name);

  // Check if folder exists
  if (fs.existsSync(routePath)) {
    console.log(chalk.red(`❌ Route "${name}" already exists.`));
    return;
  }

  // Create folders
  fs.mkdirSync(routePath, { recursive: true });

  // Page template
  const ext = typescript ? 'tsx' : 'jsx';
  const pageTemplate = `import type { PageProps } from '@/types';

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <h1>Page: ${name} {id}</h1>;
}
`;

  fs.writeFileSync(path.join(routePath, `page.${ext}`), pageTemplate);
  console.log(chalk.green(`✅ Page created at ${routePath}/page.${ext}`));

  // Optional test file
  if (withTest) {
    const testTemplate = `import { render } from '@testing-library/react';
import Page from './page.${ext}';

test('renders ${name} page', () => {
  render(<Page params={{ id: '1' }} />);
});
`;
    fs.writeFileSync(path.join(routePath, `page.test.${ext}`), testTemplate);
    console.log(chalk.green(`✅ Test created at ${routePath}/page.test.${ext}`));
  }

  // Optional API scaffold
  if (withApi) {
    const apiDir = path.join(routePath, 'api');
    fs.mkdirSync(apiDir);
    const apiTemplate = `export async function GET() {
  return new Response('Hello from API route "${name}"');
}
`;
    fs.writeFileSync(path.join(apiDir, 'route.ts'), apiTemplate);
    console.log(chalk.green(`✅ API route created at ${apiDir}/route.ts`));
  }

  // Layout info
  if (layout !== 'default') {
    console.log(chalk.blue(`ℹ️  Layout "${layout}" will be applied (manual hookup needed).`));
  }
};
