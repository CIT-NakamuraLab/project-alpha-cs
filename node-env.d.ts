declare namespace NodeJS {
  interface ProcessEnv {
    readonly SLACK_CLIENT_ID: string
    readonly SLACK_CLIENT_SECRET: string
  }
}