import express, { Request, Response } from 'express'
import path from 'path'
import { createServer } from 'http'
import { createProxyMiddleware } from 'http-proxy-middleware'
import config from './config'
import initSocket from './initSocket'

const app = express()
const httpServer = createServer(app)

const BUILD_PATH = path.resolve(__dirname, '../dist', '../../dist')

app.use(express.static(BUILD_PATH))

app.use(express.json())

if (config.IS_PROD_CLUSTER) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173')
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
        res.header('Access-Control-Allow-Headers', 'Content-Type')
        res.header('Access-Control-Allow-Credentials', 'true')
        next()
    })
}

app.use('/api', createProxyMiddleware({
    target: config.API_URL,
    pathRewrite: { '^/api': '' }
}))

app.get('/internal/isalive', (req: Request, res: Response) => {
    res.sendStatus(200)
})
app.get('/internal/isready', (req: Request, res: Response) => {
    res.sendStatus(200)
})

app.use(/^(?!.*\/(internal|static)\/).*$/, (req: Request, res: Response) => res.sendFile(path.join(BUILD_PATH, 'index.html')))

initSocket(httpServer)

const PORT = process.env.NODE_ENV === 'production' ? 8080 : 8081

httpServer.listen(PORT, () => {
    console.info(`App listening on port: ${PORT}`)
})
