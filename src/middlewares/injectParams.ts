import { IRequest } from 'node:http'

interface IInjectParamsDTO {
  req: IRequest;
  pathParams: Record<string, string> | undefined;
  queryParams: Record<string, string> | {};
}

export const injectParams = ({
  req,
  pathParams,
  queryParams,
}: IInjectParamsDTO) => {
  req.pathParams = pathParams;
  req.queryParams = queryParams;
}
