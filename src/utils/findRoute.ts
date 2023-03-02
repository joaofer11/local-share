import { routes } from "../routes"

export const findRoute = (path: string, method: string) => {
  const existingRoute = routes.find(route => (
    route.method === method &&
      route.path.test(path)
  ))
  
  console.log({ existingRoute })

  if (!existingRoute) {
    return null
  }
  
  return existingRoute
}
