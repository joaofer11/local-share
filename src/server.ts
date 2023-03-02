import { findRoute } from './utils/findRoute'
import { IRequest, IResponse, createServer } from 'node:http'
import { bodyParserHelper } from './middlewares/BodyParserHelper'
import { injectParamsHelper } from './middlewares/InjectParamsHelper'
import { responseSendingHelper } from './middlewares/ResponseSendingHelper'

const PORT = 3333

const handleReq = (req: IRequest, res: IResponse) => {
  const urlInfo = new URL(`http://localhost:${PORT}${req.url}`)

  responseSendingHelper.execute(res)

  const existingRoute = findRoute(urlInfo.pathname, req.method!)
  
  if (!existingRoute) {
    res.send!(404, { error: 'Route not found.' }) 
    return
  }
  
  injectParamsHelper.execute({
    req,
    urlInfo,
    existingRoute 
  })
  
  if (['POST', 'PUT', 'PATCH'].includes(req.method!)) {
    bodyParserHelper.execute(req, () => existingRoute.handler(req, res))
    return
  }
  
  existingRoute.handler(req, res)
}

const server = createServer(handleReq)

server.listen(PORT, () => console.log(`Server has started at http://localhost:${PORT}`))
