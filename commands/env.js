const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

module.exports = function envCmd(key, value, options) {
  let envFile = '.env.local';

  if (options.test) envFile = '.env.test';
  if (options.production) envFile = '.env.production';

  const filePath = path.join(process.cwd(), envFile);

  let content = '';
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf8');
  }

  const regex = new RegExp(`^${key}=.*$`, 'm');

  if (regex.test(content)) {
    if (options.overwrite) {
      content = content.replace(regex, `${key}=${value}`);
      console.log(chalk.yellow(`🔄 Updated ${key} in ${envFile}`));
    } else {
      console.log(chalk.red(`⚠️ ${key} already exists in ${envFile}. Use --overwrite to update.`));
      return;
    }
  } else {
    content += `${key}=${value}\n`;
    console.log(chalk.green(`✅ Added ${key} to ${envFile}`));
  }

  fs.writeFileSync(filePath, content);
};
