import 'http'

declare module 'http' {
  export interface IRequest extends IncomingMessage {
    pathParams?: Record<string, string>;
    queryParams?: Record<string, string> | {};
    body?: string | Record<string, string>;
  }
}
