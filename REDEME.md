# React 组件库

- 通过 rollup 打包
- vite 本地调式

## 脚本

本地调试

```sh
yarn run dev
# or
npm run dev
```

build

```sh
yarn run build:esm
```

build typescript declare (构建声明文件)

```sh
yarn run build:dts
```

publish to npmJs.com

```sh
npm run build
# 发布使用官方源，国内镜像源发布不了
npm set registry https://registry.npmjs.org/

npm login

npm run publish
# 恢复npm淘宝镜像源
npm config set registry https://registry.npmmirror.com/
```

## npm 发包版本号规范

`发布前修改，package.json中的version, 避免发布失败, 相同版本发布会失败`

常见格式: x.y.z-state,如 1.0.0-alpha

x:主版本号；y:次版本号；y:补丁版本号；state：版本状态

state:

- alpha 内测版本
- beta 公测版本
- rc (release candidate) 候选发布版本(预发布版本)

| 命令 | 作用 |
| ---- | ---- |

|npm unpublish 包名@版本号 --force | 强制删除已发布版本 <br>npm unpublish test@1.0.0-alpha|

|npm deprecate 包名@版本号 描述 | 强制删除已发布版本 <br> npm deprecate test@1.0.1 '该版本弃用'|
