import { routes } from "../routes"
import { IRequest } from 'node:http'
import { injectParams } from "../middlewares/injectParams"

export const findRoute = (req: IRequest, port: number) => {
  const url = new URL(`http://localhost:${port}${req.url}`)

  const existingRoute = routes.find(route => (
    route.method === req.method &&
      route.path.test(url.pathname)
  ))
  
  if (!existingRoute) {
    return null
  }
  
  const pathParams = url.pathname.match(existingRoute.path)!.groups
  
  const queryParams =  Object.fromEntries(url.searchParams)
  
  injectParams({
    req,
    pathParams,
    queryParams,
  })

  return existingRoute
}
