import { IRequest } from 'http'

export class BodyParser {
  private _bytesRead: number;
  private _highWaterMark: number;
  private _bufferdData: Buffer[];

  constructor () {
    this._bufferdData = [];
    this._bytesRead = 0;
    this._highWaterMark = 1000000 // 1MB;
  }

  parse (req: IRequest, callback: Function) {
    const contentType = req.headers['content-type']

    if (contentType === 'application/json') {
      this._parseJson(req, callback) 
      return
    }

    if (contentType === 'text/plain') {
      this._parseText(req, callback)
      return
    }

    callback()
  }

  private _parseJson (req: IRequest, callback: Function) {
    this._checkThreshold() 

    req.on('data', (chunk: Buffer) => {
      this._bufferdData.push(chunk)
      this._bytesRead += chunk.byteLength
    })

    req.on('end', () => {
      req.body = JSON.parse(Buffer.concat(this._bufferdData).toString())
      callback()
    }) 
  }

  private _parseText (req: IRequest, callback: Function) {
    this._checkThreshold()

    req.on('data', (chunk: Buffer) => {
      this._bufferdData.push(chunk)
      this._bytesRead += chunk.byteLength
    })

    req.on('end', () => {
      req.body = Buffer.concat(this._bufferdData).toString()
      callback()
    }) 
  }

  private _checkThreshold () {
    if (this._bytesRead >= this._highWaterMark) {
      throw new Error('You must implement your own way of consuming data.')
    }
  }
}
