import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"

const database = new Database()

export const routes = [
        {
            method: 'GET',
            patch: '/tasks',
            handler: (req, res) => {
                const tasks = database.select('tasks')

                res.end(JSON.stringify(tasks))
            }
        },
        {
            method: 'POST',
            patch: '/tasks',
            handler: (req, res) => {
                const { title, description } = req.body

                const task = {
                    id: randomUUID(),
                    title,
                    description,
                    created_at: new Date(),
                }
        
                database.insert('tasks', task)
        
                res.writeHead(201).end()
            }
        }
    ]
