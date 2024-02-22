import webpack from "webpack";
import path from "path";
import { buildWebpackConfig } from "./config/build/buildWebpackConfig";
import { BuildEnv, BuildPats } from "./config/build/types/config";

export default (env: BuildEnv) => {
  const paths: BuildPats = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
    locales: path.resolve(__dirname, "public", "locales"),
    buildLocales: path.resolve(__dirname, "build", "locales"),
  };

  const mode = env.mode || "development";

  const isDev = mode === "development";

  const PORT = env.port || 3000;

  // const apiUrl = env.apiUrl || "http://localhost:8000";

  // const apiUrl = env.apiUrl || "http://192.168.1.151:8000";

  const apiUrl = env.apiUrl || "https://json-server-product-one.vercel.app";

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths: paths,
    isDev,
    port: PORT,
    apiUrl,
    project: "frontend",
  });

  return config;
};
