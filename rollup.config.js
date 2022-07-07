import * as path from "path";
import * as fs from "fs";
/**node路径解析 */
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
/**编译ts&tsx文件 */
import typescript from "rollup-plugin-typescript2";
/**转换css预处理器文件成css文件 */
import postcss from "rollup-plugin-postcss";
/**静态资源保留 */
import copyAssets from "rollup-plugin-copy";
/**类型处理 */
import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import less from "less";

const MODE_ENV = process.env.MODE_ENV;

// babel配置
const babelOptions = {
  presets: ["@babel/preset-env"],
  extensions: [".js", ".jsx", ".ts", ".tsx", ".less"],
  exclude: "**/node_modules/**",
  babelHelpers:"inline"
};
// 忽略文件
const externalConfig = [
  "react",
  "react-dom",
  "classname",
  // "@fortawesome/fontawesome-svg-core",
  // "@fortawesome/free-solid-svg-icons",
  // "@fortawesome/react-fontawesome",
  "**/node_modules/**",
];
// copy静态资源
const assetsConfig = {
  targets: [
    {
      src: "component/assets/*.jpg",
      dest: "lib/assets",
    },
  ],
};
const entry = "src/lib/index.ts";
const componentsDir = "src/lib";
const componentsName = fs.readdirSync(path.resolve(componentsDir));
const componentsEntry = true
  ? []
  : componentsName.map((name) => `${componentsDir}/${name}/index.ts`);
// less打包
const processLess = function (context) {
  return new Promise((resolve, reject) => {
    less.compile(
      {
        file: context,
      },
      function (err, result) {
        if (!err) {
          resolve(result);
        } else {
          reject(result);
        }
      }
    );
    less.compile(context, {}).then(
      function (output) {
        if (output && output.css) {
          resolve(output.css);
        } else {
          reject({});
        }
      },
      function (err) {
        reject(err);
      }
    );
  });
};
// 入口文件
const entryFileUrl = "src/lib/index.ts";
// 组件导出目录
const libOutputUrl = "./dist/";
// 类型导出目录
const typeOutputUrl = "./dist/interface";
//
const libPlugins = [
  peerDepsExternal(),
  resolve(),
  commonjs(),
  json(),
  postcss({
    extract: true,
  }),
  typescript(),
  babel(babelOptions),
];

export default () => {
  switch (MODE_ENV) {
    case "esm":
      return [
        {
          input: entryFileUrl,
          output: {
            preserveModules: true,
            dir: libOutputUrl,
            format: "es",
          },
          external: externalConfig,
          plugins: [...libPlugins],
        },
      ];
  }
};
