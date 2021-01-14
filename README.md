# wogit
git clone加速命令行工具，使用加速镜像解决从github克隆速度慢的问题，支持git命令透传，可以只在需要clone的时候使用，也可以替代git作为日常使用。

## 安装

```bash
npm i wogit -g
```

## 使用
wogit的使用，除了支持几个指定特定源的选项之外，其他的与git一致，基本是把`git`替换成`wogit`即可

```bash
# from
git clone https://github.com/chalk/chalk.git

# ti
wogit clone https://github.com/chalk/chalk.git

# 其他参数不变，跟使用git一样，如
wogit clone https://github.com/chalk/chalk.git --depth=1
```

## 镜像切换
wogit默认使用cnpmjs镜像，使用 `wogit -h` 可以随时查看镜像切换的选项

```sh
➜ wogit -h
Usage: wogit [options]

Options:
  -V, --version   output the version number
  -cn --cnpm      cnpmjs镜像(默认)
  -fa --fastgit   fastgit镜像
  -ge --gitee     gitee镜像
  -gc --gitclone  gitclone镜像
  -gh --github    使用原始github镜像
  -h, --help      display help for command
```
比如
```bash
# fastgit镜像
wogit clone https://github.com/chalk/chalk.git -fa
wogit clone https://github.com/chalk/chalk.git --fastgit

# gitee镜像
wogit clone https://github.com/chalk/chalk.git -ge
wogit clone https://github.com/chalk/chalk.git -gitee

# 其他不一而足
```

说明：并非所有的仓库都有加速，请根据提示，确认是否需要使用`-gh`强制直接使用github。

## 说明
wogit只会在 **操作为clone且远程为github仓库** 时才会使用加速的源，其他情况是透传的，因此clone外的其他操作也是支持的，可以替代git作为日常使用。

当然，也有不好的地方——**命令多了两个字符** 😂  没办法，短的名字都被早早占了坑了。

