#!/usr/bin/env node

import esbuild from "esbuild";
import esbuildPluginDsv from "esbuild-plugin-dsv";
import fs from "fs/promises";
import path from "path";
import url from "url";

const outdir = url.fileURLToPath(new URL("../docs", import.meta.url));
const deletes = [];

const filepaths = await fs.readdir(outdir);
filepaths.forEach((filepath) => {
  if (filepath.match(/\.(css|js)(\.map)?$/)) {
    deletes.push(fs.unlink(path.join(outdir, filepath)));
  }
});

await Promise.all(deletes);
await esbuild.build({
  bundle: true,
  entryPoints: [url.fileURLToPath(new URL("../src/index.tsx", import.meta.url))],
  format: "esm",
  minify: true,
  outdir,
  plugins: [esbuildPluginDsv.dsvPlugin()],
  sourcemap: true,
  splitting: true,
  target: "es6"
});
