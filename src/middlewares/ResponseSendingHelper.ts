import { IResponse } from 'http'

class ResponseSendingHelper {
  execute (res: IResponse) {
    this._injectSend(res)
    this._injectSendStatus(res)
  }
  
  private _injectSend (res: IResponse) {
    res.send = function send (statusCode, data) {
      const dataAsJson = JSON.stringify(data)

      res
        .writeHead(statusCode, {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(dataAsJson)
        })
        .end(Buffer.from(dataAsJson))
    }
  }

  private _injectSendStatus (res: IResponse) {
    res.sendStatus = function sendStatus (statusCode) {
      res
        .writeHead(statusCode)
        .end()
    }
  }
}

export const responseSendingHelper = new ResponseSendingHelper()
