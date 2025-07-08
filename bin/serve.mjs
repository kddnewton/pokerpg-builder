import esbuild from "esbuild";
import esbuildPluginDsv from "esbuild-plugin-dsv";
import url from "url";

const outdir = url.fileURLToPath(new URL("../docs", import.meta.url));
const ctx = await esbuild.context({
  bundle: true,
  entryPoints: [url.fileURLToPath(new URL("../src/index.tsx", import.meta.url))],
  format: "esm",
  outdir,
  plugins: [esbuildPluginDsv.dsvPlugin()],
  sourcemap: true,
  splitting: true,
  target: "esnext"
});

const serve = await ctx.serve({ servedir: outdir });
console.log(`Listening at ${serve.hosts[0]}:${serve.port}`);
