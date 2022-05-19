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
    mqqt: Mqqt
  }
  interface Mqqt {
    port: number
    protocolVersion: number
    keepalive: number
    properties: Properties
  }
  interface Properties {
    requestResponseInformation: boolean
    requestProblemInformation: boolean
  }
  export const config: Config
  export type Config = IConfig
}
