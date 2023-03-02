import 'http'

declare module 'http' {
  export interface IRequest extends IncomingMessage {
    pathParams?: Record<string, string>;
    queryParams?: Record<string, string> | {};
    body?: string | Record<string, string>;
  }

  export interface IResponse extends ServerResponse {
    send?: (
      statusCode: number, data: 
      Record<string, unknown> | Record<string, unknown>[]
    ) => void;

    sendStatus?: (statusCode: number) => void;
  }
}
