#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const program = require('commander');
const ncp = require('ncp').ncp;
const { prompt } = require('inquirer');
const replace = require('replace-in-file');

clear();
console.log(
  chalk.yellow(
    figlet.textSync('Web Component', { horizontalLayout: 'full' })
  )
);


program
  .version('1.0.0')
  .description('web component cli');

const questions = [
  {
    type: 'input',
    name: 'packagename',
    message: 'Enter package name ...'
  }
];

program
  .command('init') // No need of specifying arguments here
  .alias('i')
  .description('Add a Package')
  .action(() => {
    prompt(questions).then(answers =>
      addPackage(answers));
  });
program.parse(process.argv);

const addPackage = answers => {
  const source = '/'+__filename.substring(1, __filename.length - 8) + 'zcui-wc-sample-component';
  ncp(source, `zcui-wc-${answers.packagename}`, function (err) {
    if (err) {
      return console.error(err);
    }
    const changes = replace.sync({
      files: [
        `zcui-wc-${answers.packagename}/build.js`,
        `zcui-wc-${answers.packagename}/index.html`,
        `zcui-wc-${answers.packagename}/merge-files.js`,
        `zcui-wc-${answers.packagename}/package.json`,
        `zcui-wc-${answers.packagename}/README.md`,
        `zcui-wc-${answers.packagename}/rollup.config.js`,
      ],
      from: /sample-component/g,
      to: answers.packagename,
    });
    console.log('Package created!');
  });
}

// if (files.directoryExists('.git')) {
//   console.log(chalk.red('Already a git repository!'));
//   process.exit();
// }