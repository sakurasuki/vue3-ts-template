import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
const path = require("path");
import vueJsx from "@vitejs/plugin-vue-jsx";
import { visualizer } from "rollup-plugin-visualizer";
// 按需引入组件/ui组件库
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
// 按需引入vueapi
import AutoImport from "unplugin-auto-import/vite";
const resolve = (dir) => path.join(__dirname, dir);
// https://vitejs.dev/config/
export default ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, process.cwd());
  return defineConfig({
    base: "/",
    plugins: [
      vue({ reactivityTransform: true }), //开启实验性语法 用于props设置默认值
      vueJsx(),
      visualizer(),
      Components({
        dirs: ["src/components"],
        // ui库解析器
        resolvers: [VantResolver()],
        extensions: ["vue"],
      }),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/, // .md
        ],
        dts: true,
        imports: ["vue", "vue-router"],
      }),
    ],
    server: {
      proxy: {
        [VITE_BASE_URL]: {
          target: "https://www.exosomedemon.com/api/",
          rewrite: (path) => path.replace(VITE_BASE_URL, ""),
          changeOrigin: true,
          ws: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("src"),
        comps: resolve("src/components"),
        styles: resolve("src/styles"),
        "@imgs": resolve("src/assets/imgs"),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve("src/styles/variable.less")}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  });
};
