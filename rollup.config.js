import typescriptPlugin from "rollup-plugin-typescript2";
import typescript from "typescript";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import shebang from "rollup-plugin-hashbang";
import json from "@rollup/plugin-json";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
    },
  ],
  plugins: [
    shebang(),
    json(),
    peerDepsExternal(),
    typescriptPlugin({
      typescript,
    }),
  ],
};
