import http from 'http'

const PORT = 3333

const handleReq = (req: http.IncomingMessage, res: http.ServerResponse) => {
  res.end(Buffer.from(`${req.method} at ${req.url}`))
}

const server = http.createServer(handleReq)

server.listen(PORT, () => console.log(`Server has started at http://localhost:${PORT}`))
