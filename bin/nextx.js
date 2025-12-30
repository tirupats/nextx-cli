#!/usr/bin/env node

const { program } = require('commander');
const routeCmd = require('../commands/route');

// CLI version and description
program
  .version('1.0.0', '-v, --version', 'Show CLI version')
  .description('Nextx CLI - generate routes and components for Next.js 16');

// ROUTE command
program
  .command('route <name>')
  .description('Create a new page route')
  .option('-l, --layout <layout>', 'Layout to use', 'default')
  .option('-t, --typescript', 'Generate TypeScript page', true)
  .option('--no-typescript', 'Generate JavaScript page')
  .option('--with-test', 'Generate test file')
  .option('--with-api', 'Generate API scaffold')
  .action(routeCmd);

// COMPONENT command
program
  .command('component <name>')
  .description('Generate a reusable React component')
  .option('-t, --typescript', 'Generate TypeScript component', true)
  .option('--no-typescript', 'Generate JavaScript component')
  .option('--with-test', 'Generate test file')
  .option('--with-styles', 'Generate CSS module file')
  .option('--functional', 'Generate functional component', true)
  .option('--class', 'Generate class component')
  .option('--folder', 'Create a folder for the component')
  .action((name, options) => {
    if (options.class) options.functional = false; // override functional if class flag is used
    require('../commands/component')(name, options);
  });

// API command
program
  .command('api <name>')
  .description('Generate a Next.js API route')
  .option('-t, --typescript', 'Generate TypeScript file', true)
  .option('--no-typescript', 'Generate JavaScript file')
  .option('--method <method>', 'HTTP method', 'GET')
  .action((name, options) => {
    require('../commands/api')(name, options);
  });


// ENV command

program
  .command('env <key> <value>')
  .description('Add or update an environment variable in .env files')
  .option('--local', 'Use .env.local', true)
  .option('--test', 'Use .env.test')
  .option('--production', 'Use .env.production')
  .option('--overwrite', 'Overwrite existing key')
  .action((key, value, options) => {
    require('../commands/env')(key, value, options);
  });

//HOOK command
program
  .command('hook <name>')
  .description('Generate a reusable React hook')
  .option('-t, --typescript', 'Generate TypeScript hook', true)
  .option('--no-typescript', 'Generate JavaScript hook')
  .option('--with-test', 'Generate test file')
  .option('--folder', 'Create a folder for the hook')
  .action((name, options) => {
    require('../commands/hook')(name, options);
  });

//LAYOUT command
program
  .command('layout <name>')
  .description('Generate a reusable layout')
  .option('-t, --typescript', 'Generate TypeScript layout', true)
  .option('--no-typescript', 'Generate JavaScript layout')
  .option('--with-test', 'Generate test file')
  .option('--with-styles', 'Generate CSS module')
  .option('--folder', 'Create a folder for the layout', true)
  .action((name, options) => {
    require('../commands/layout')(name, options);
  });

// SETUP command
program
  .command('setup [projectName]')
  .description('Initialize a new Next.js 16 project with src/ folder structure')
  .option('-t, --typescript', 'Use TypeScript', true)
  .option('--no-typescript', 'Use JavaScript')
  .option('--git', 'Initialize git', true)
  .option('--no-git', 'Skip git init')
  .option('--install', 'Install dependencies', true)
  .option('--no-install', 'Skip npm install')
  .option('--eslint', 'Add ESLint config', true)
  .option('--no-eslint', 'Skip ESLint config')
  .option('--prettier', 'Add Prettier config', true)
  .option('--no-prettier', 'Skip Prettier config')
  .action((projectName, options) => {
    require('../commands/setup')(projectName, options);
  });

//STORE command
program
  .command('store <name>')
  .description('Generate a state store in src/lib')
  .option('-t, --typescript', 'Generate TypeScript store', true)
  .option('--no-typescript', 'Generate JavaScript store')
  .option('--folder', 'Create a folder for the store')
  .option('--with-test', 'Generate test file')
  .action((name, options) => {
    require('../commands/store')(name, options);
  });

// TEST command
program
  .command('test <name>')
  .description('Generate a test file for component, hook, store, page, or layout')
  .option('-t, --typescript', 'Generate TypeScript test', true)
  .option('--no-typescript', 'Generate JavaScript test')
  .option('--path <path>', 'Custom folder path for test')
  .option('--type <type>', 'Type of test: component, hook, store, page, layout', 'component')
  .action((name, options) => {
    require('../commands/test')(name, options);
  });

// UTILS command
program
  .command('utils <name>')
  .description('Generate a utility/helper file in src/lib')
  .option('-t, --typescript', 'Generate TypeScript file', true)
  .option('--no-typescript', 'Generate JavaScript file')
  .option('--folder', 'Create a folder for the utility')
  .option('--with-test', 'Generate test file')
  .action((name, options) => {
    require('../commands/utils')(name, options);
  });
  
// Show help if no args
if (!process.argv.slice(2).length) {
  program.outputHelp();
}

// Parse CLI arguments
program.parse(process.argv);
