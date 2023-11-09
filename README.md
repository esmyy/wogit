# wogit

A command line tool to speed up cloning from GitHub.

## install

```bash
npm i wogit -g
```

## usage

```bash
# from
git clone https://github.com/chalk/chalk.git

# to
wogit clone https://github.com/chalk/chalk.git

# keep other args, same as git
wogit clone https://github.com/chalk/chalk.git --depth=1
```

## switch mirror

use `wogit -h` to list available mirrors

```sh
➜ wogit -h
Usage: wogit [options]

Options:
  -V, --version   output the version number
  -ge --gitee     gitee mirror
  -gc --gitclone  gitclone mirror
  -h, --help      display help for command
```

for example

```bash
wogit clone https://github.com/chalk/chalk.git -ge
wogit clone https://github.com/chalk/chalk.git --gitee
```
