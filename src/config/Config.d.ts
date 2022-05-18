/* tslint:disable */
/* eslint-disable */
declare module "node-config-ts" {
  interface IConfig {
    port: number
    host: string
    baseUrl: string
    dbUri: string
    dbUser: string
    dbPassword: string
  }
  export const config: Config
  export type Config = IConfig
}
