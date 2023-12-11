import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    svgr({
      // svgr options: https://react-svgr.com/docs/options/
      svgrOptions: {
        // ...
      },

      // esbuild options, to transform jsx to js
      esbuildOptions: {
        // ...
      },

      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
      include: "**/*.svg",

      //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
      exclude: "",
    }),
    react(),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  define: {
    __IS_DEV__: JSON.stringify(true),
    __API__: JSON.stringify("http://localhost:8000"),
    __PROJECT__: JSON.stringify("frontend"),
  },
});
