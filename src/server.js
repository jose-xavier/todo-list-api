import http from 'node:http'
import { randomUUID } from 'node:crypto'
import { json } from './middlewares/json.js'

const tasks = []

const server = http.createServer(async (req, res) => {

    const { url, method } = req

    await json(req, res)
    
    if(method === 'GET' && url === '/tasks') {
        res.end(JSON.stringify(tasks))
    }

    if(method === 'POST' && url === '/tasks') {
        const { title, description } = req.body

        tasks.push({
            id: randomUUID(),
            title,
            description,
            created_at: new Date(),
        })

        res.writeHead(204).end()
    }
})

server.listen(3333)