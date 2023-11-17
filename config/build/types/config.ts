export type BuildMode = 'production' | 'development'

export interface BuildPats {
  entry: string
  build: string
  html: string
  src: string
}

export interface BuildEnv {
  mode: BuildMode
  port: number
}

export interface BuildOptions {
  mode: BuildMode
  paths: BuildPats
  isDev: boolean
  port: number
}
