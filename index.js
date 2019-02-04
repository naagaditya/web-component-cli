#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');
const files = require('./lib/files');
const program = require('commander');
const ncp = require('ncp').ncp;
const { prompt } = require('inquirer');
const replace = require('replace-in-file');
const fs = require('fs');

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
    const changesSnakeCase = replace.sync({
      files: [
        `zcui-wc-${answers.packagename}/build.js`,
        `zcui-wc-${answers.packagename}/index.html`,
        `zcui-wc-${answers.packagename}/merge-files.js`,
        `zcui-wc-${answers.packagename}/package.json`,
        `zcui-wc-${answers.packagename}/README.md`,
        `zcui-wc-${answers.packagename}/rollup.config.js`,
        `zcui-wc-${answers.packagename}/src/*`,
      ],
      from: /sample-component/g,
      to: answers.packagename,
    });

    const packagenameCapital = answers.packagename.charAt(0).toUpperCase() + answers.packagename.slice(1);
    const changesCamelCase = replace.sync({
      files: [
        `zcui-wc-${answers.packagename}/src/zcui-wc-sample-component.js`,
      ],
      from: /SampleComponent/g,
      to: packagenameCapital.replace(/_(\w)/g, (m => m[1].toUpperCase())),
    });

    const filesToRename = [
      `zcui-wc-${answers.packagename}/src/zcui-wc-sample-component.js`,
      `zcui-wc-${answers.packagename}/src/zcui-wc-sample-component.ejs`,
      `zcui-wc-${answers.packagename}/src/zcui-wc-sample-component.scss`,
    ];

    filesToRename.forEach(file => {
      fs.rename(file, `zcui-wc-${answers.packagename}/src/zcui-wc-${answers.packagename}.${file.split('.')[1]}`, function (err) {
        if (err) throw err;
      });
    })

    console.log('Package created!');
  });
}

// if (files.directoryExists('.git')) {
//   console.log(chalk.red('Already a git repository!'));
//   process.exit();
// }