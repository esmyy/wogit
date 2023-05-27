# wogit

git clone 加速命令行工具，使用加速镜像解决从 github 克隆速度慢的问题。

## 安装

```bash
npm i wogit -g
```

## 使用

```bash
# from
git clone https://github.com/chalk/chalk.git

# to
wogit clone https://github.com/chalk/chalk.git

# 其他参数不变，跟使用git一样，如
wogit clone https://github.com/chalk/chalk.git --depth=1
```

## 镜像切换

使用 `wogit -h` 查看镜像切换的选项

```sh
➜ wogit -h
Usage: wogit [options]

Options:
  -V, --version   output the version number
  -ge --gitee     gitee镜像
  -gc --gitclone  gitclone镜像
  -h, --help      display help for command
```

比如

```bash
wogit clone https://github.com/chalk/chalk.git -ge
wogit clone https://github.com/chalk/chalk.git --gitee
```
