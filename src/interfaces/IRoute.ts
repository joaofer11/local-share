import { IRequest, ServerResponse } from 'node:http'

export interface IRoute {
  method: string;
  path: RegExp;
  handler: (
    request: IRequest, 
    response: ServerResponse
  ) => void;
}
