const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild.build({
  entryPoints: ["src/main/server.ts"],
  bundle: true,
  platform: "node",
  packages: "external",
  target: "node22",
  outfile: "dist/app.js",
  sourcemap: true,
  minify: true,
  tsconfig: "tsconfig.json",
  plugins: [nodeExternalsPlugin()],
});
