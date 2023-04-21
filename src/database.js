import fs from 'node:fs/promises'

const databasePatch = new URL('../db.json', import.meta.url)

export class Database {
    #database = {}

    constructor() {
        fs.readFile(databasePatch, 'utf8')
        .then( data => {
            this.#database = JSON.parse(data)
        })
        .catch( () => {
            this.#persist()
        })
    }

    #persist() {
        fs.writeFile(databasePatch, JSON.stringify(this.#database))
    }

    select(table) {
        const data = this.#database[table] ?? [];

        return data
    }

    insert(table, data) {
        if (Array.isArray(this.#database[table])) {
            this.#database[table].push(data)
        } else {
            this.#database[table] = [data]
        }

        this.#persist()

        return data
    }

    delete(table, id) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1)
            this.#persist()
        }
    }

    update(table, id, data) {
        const rowIndex = this.#database[table].findIndex(row => row.id === id)

        if(rowIndex > -1) {
            const row = this.#database[table][rowIndex] 

            this.#database[table][rowIndex] = { id, ...row, ...data }
            this.#persist()
        }
    }
}