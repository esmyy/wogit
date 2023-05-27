#!/usr/bin/env node

const path = require("path");
const { program } = require("commander");
const shelljs = require("shelljs");
const pkg = require(path.resolve(__dirname, "package.json"));

const GH_ADDR_MATCH_REG = /(https?:\/\/github\.com)(\/.*\/)+([^\/]+\.git)/;
const GH_TEST_REG = /https?:\/\/github\.com\/.*.git/;
const MIRROR_DICT = {
  gitee: "https://gitee.com/mirrors/",
  gitclone: "https://gitclone.com/github.com",
};
const MIRROR_LIST = Object.keys(MIRROR_DICT);

program
  .version(pkg.version)
  .allowUnknownOption()
  .option("-ge --gitee", "gitee 镜像")
  .option("-gc --gitclone", "gitclone 镜像")
  .parse();

/**
 * convert a git command to new mirror
 * @param {string} originCmd
 * @param {} usedMirror
 */
function convertCmd(originCmd, usedMirror) {
  let cmd = originCmd;
  let matchedArr = cmd.match(GH_ADDR_MATCH_REG);
  let repoAddrObj = matchedArr
    ? {
        url: matchedArr[0],
        domain: matchedArr[1],
        path: matchedArr[2],
        name: matchedArr[3],
      }
    : null;

  if (repoAddrObj) {
    // path not the same on gitee
    if (usedMirror === "gitee") {
      cmd = cmd.replace(
        repoAddrObj.url,
        MIRROR_DICT[usedMirror] + repoAddrObj.name
      );
    } else {
      cmd = cmd.replace(
        repoAddrObj.url,
        MIRROR_DICT[usedMirror] + repoAddrObj.path + repoAddrObj.name
      );
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
  const index = mirrorList.findIndex(function (key) {
    return program[key];
  });

  return index >= 0 ? mirrorList[index] : "";
}

const args = program.parse(process.argv).args;
let cmd = args.join(" ");
let usedMirror = "";

// only when repo was clone from github needs to change mirror
// two points: only github, only clone
if (/(^|\s)clone\s/.test(cmd) && GH_TEST_REG.test(cmd)) {
  usedMirror = getUsedMirror(program, MIRROR_LIST) || "gitclone";
  cmd = convertCmd(cmd, usedMirror);
}

cmd = "git " + cmd;
cmd = cmd.replace(/\sclone\s/, " clone --progress ");

console.log("cmd", cmd);
shelljs.exec(cmd);
