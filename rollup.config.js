import * as path from "path";
import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import copyAssets from "rollup-plugin-copy";
import dts from "rollup-plugin-dts";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import less from "less";

// babel配置
const babelOptions = {
  presets: ["@babel/preset-env"],
  extensions: [".js", ".jsx", ".ts", ".tsx", ".scss", ".less"],
  // exclude: "**/node_modules/**",
  exclude: /node_modules/,
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
const libOutputUrl = "./dist/lib/";
// 类型导出目录
const typeOutputUrl = "./dist/interface";
//
const libPlugins = [
  peerDepsExternal(),
  resolve(),
  postcss({
    extract: true,
  }),
  commonjs(),
  typescript(),
  babel(babelOptions),
  json(),
];
const typePlugins = [
  peerDepsExternal(),
  resolve(),
  postcss({
    extract: true,
  }),
  commonjs(),
  typescript(),
  babel(babelOptions),
  json(),
  dts(),
];
export default [
  {
    input: entryFileUrl,
    output: {
      // file: "./lib/bundle.js",
      preserveModules: true,
      dir: libOutputUrl,
      format: "es",
      // assetFileNames: ({ name }) => {
      //   const { ext, dir, base } = path.parse(name);
      //   if (ext !== ".css") return "[name].[ext]";
      //   // 规范 style 的输出格式
      //   return path.join(dir, "style", base);
      // },
    },
    external: externalConfig,
    plugins: [...libPlugins],
  },
  {
    input: entryFileUrl,
    external: externalConfig,
    output: {
      // file: "./lib/bundle.js",
      preserveModules: true,
      dir: typeOutputUrl,
      format: "es",
      assetFileNames: ({ name }) => {
        const { ext, dir, base } = path.parse(name);
        throw `echo${name}`
        if (ext !== ".css") return "[name].[ext]";
        // 规范 style 的输出格式
        return path.join(dir, "style", base);
      },
    },
    plugins: [...typePlugins],
  },
];
