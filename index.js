#!/usr/bin/env node

const path = require('path');
const { program } = require('commander');
const shelljs = require('shelljs');
const pkg = require(path.resolve(__dirname, 'package.json'));

const GH_ADDR_MATCH_REG = /(https?:\/\/github\.com)(\/.*\/)+([^\/]+\.git)/;
const GH_TEST_REG = /https?:\/\/github\.com\/.*.git/;
const MIRROR_DICT = {
  cnpm: 'https://github.com.cnpmjs.org/',
  gitee: 'https://gitee.com/mirrors/',
  gitclone: 'https://gitclone.com/github.com/',
  fastgit: 'https://hub.fastgit.org/',
  github: 'https://github.com/',
};
const MIRROR_LIST = Object.keys(MIRROR_DICT);

program
  .version(pkg.version)
  .allowUnknownOption()
  .option('-cnpm', '使用cnpmjs镜像,默认')
  .option('-fastgit', '使用fastgit镜像')
  .option('-gitee', '使用gitee镜像')
  .option('-gitclone', '使用gitclone镜像')
  .parse();

/**
 * @param {string} cmd
 * e.g., https://github.com/chalk/chalk.git
 * return repo's name
 */
function getRepoName(cmd) {
  const matched = cmd.match(/[^\/]+\.git(\s|$)/)[0];
  return Array.isArray(matched) ? matched[0] : '';
}

/**
 * convert a git command to new mirror
 * @param {string} originCmd 
 * @param {} usedMirror 
 */
function convertCmd(originCmd, usedMirror) {
  let cmd = originCmd;
  let matchedArr = cmd.match(GH_ADDR_MATCH_REG);
  let repoAddrObj = matchedArr ? {
    url: matchedArr[0],
    domain: matchedArr[1],
    path: matchedArr[2],
    name: matchedArr[3],
  } : null;

  if (repoAddrObj) {
    // path not the same on gitee
    if (usedMirror === 'gitee') {
      cmd = cmd.replace(repoAddrObj.url, MIRROR_DICT[usedMirror] + repoAddrObj.name);
    } else {
      cmd = cmd.replace(repoAddrObj.url, MIRROR_DICT[usedMirror] + repoAddrObj.path + repoAddrObj.name);
    }
  }

  return cmd;
}

/**
 * get the mirror name
 * @param {object} program 
 * @param {array} mirrorList 
 */
function getUsedMirror(program, mirrorList) {
  let index = mirrorList.findIndex(function(key) {
    return key !== 'github' && program[key];
  });

  return index >= 0 ? mirrorList[index] : '';
}

const args = program.parse(process.argv).args;
let cmd = args.join(' ');
let usedMirror = '';

// only when repo was clone from github needs to change mirror
// two points: only github, only clone
if (GH_TEST_REG.test(cmd) && /clone/.test(cmd)) {
  usedMirror = getUsedMirror(program, MIRROR_LIST) || 'github';
  cmd = convertCmd(cmd, usedMirror);
  console.log('镜像:', usedMirror);
}

// args[0] = repoUrl;
console.log('sste', cmd, usedMirror);
// shelljs.exec('git clone --progress ' + args.join(' '));
