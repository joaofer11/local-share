import { IRequest, IResponse } from 'node:http'

export interface IRoute {
  method: string;
  path: RegExp;
  handler: (
    request: IRequest, 
    response: IResponse
  ) => void;
}
