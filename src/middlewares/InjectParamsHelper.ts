import { IRequest } from 'http'
import { IRoute } from 'src/interfaces/IRoute';

interface IInjectParamsDTO {
  req: IRequest;
  urlInfo: URL;
  existingRoute: IRoute;
}

interface IInjectPathParamsDTO {
  req: IRequest;
  pathname: string
  existingRoute: IRoute;
}

class InjectParamsHelper {

  execute ({ req, urlInfo, existingRoute }: IInjectParamsDTO) {
    const { pathname, searchParams } = urlInfo

    this._injectQuery(req, searchParams)
    this._injectPathParams({
      req, 
      pathname,
      existingRoute,
    })
  }

  private _injectQuery (req: IRequest, queryParams: Iterable<readonly [PropertyKey, any]>) {
    const queryParamsAsObj = Object.fromEntries(queryParams)
    req.queryParams = queryParamsAsObj
  }

  private _injectPathParams ({
    req,
    pathname,
    existingRoute,
  }: IInjectPathParamsDTO) {
    const pathParams = pathname.match(existingRoute.path)?.groups
    req.pathParams = pathParams
  }
} 

export const injectParamsHelper = new InjectParamsHelper()
