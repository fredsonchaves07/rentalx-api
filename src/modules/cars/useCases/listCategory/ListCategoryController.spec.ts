import createConnection  from '@shared/infra/typeorm';
import { v4 as uuid } from 'uuid'
import { hash } from 'bcryptjs'
import { app } from '@shared/infra/http/app'
import request from 'supertest'
import { Connection } from 'typeorm';

let connection: Connection

describe('List category controller', () => {
    beforeAll(async() => {
        connection = await createConnection()
        await connection.runMigrations()

        const id = uuid()
        const password = await hash('admin', 8)
    
        await connection.query(
            `INSERT INTO users(id, name, email, password, "isAdmin", created_at, driver_license)
             VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')
            `
        )
    })

    afterAll(async() => {
        await connection.dropDatabase()
        await connection.close()
    })

    it('should be able to list all categories', async() => {
        const responseToken = await request(app).post('/session')
        .send({
            email: 'admin@rentx.com.br',
            password: 'admin'
        })

        const { token } = responseToken.body

        await request(app).post('/categories')
        .send({
            name: 'Category supertest',
            description: 'Category supertest'
        }).set({
            Authorization: `Bearer ${token}`
        })

        const response = await request(app).get('/categories')

        expect(response.status).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0]).toHaveProperty('id')
        expect(response.body[0].name).toEqual('Category supertest')
    })
})