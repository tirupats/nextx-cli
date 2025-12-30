const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function apiCmd(name, options) {
  const typescript = options.typescript !== false; // default true
  const ext = typescript ? 'ts' : 'js';
  const method = (options.method || 'GET').toUpperCase();

  // Build folder path
  const basePath = path.join(process.cwd(), 'app', 'api', name);
  fs.mkdirSync(basePath, { recursive: true });

  // Create route file
  const routeFile = path.join(basePath, `route.${ext}`);

  const template = `export async function ${method}() {
  return new Response('Hello from API route "${name}" [${method}]');
}
`;

  fs.writeFileSync(routeFile, template);
  console.log(chalk.green(`✅ API route created at ${routeFile}`));
};
