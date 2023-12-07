export type BuildMode = "production" | "development";

export interface BuildPats {
  entry: string;
  build: string;
  html: string;
  src: string;
  locales: string;
  buildLocales: string;
}

export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
}

export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPats;
  isDev: boolean;
  port: number;
  apiUrl: string;
  project: "frontend" | "jest";
}
