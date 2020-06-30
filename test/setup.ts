import supertest from 'supertest'

const baseUrl = `http://${process.env.HOST}:${process.env.PORT}/${process.env.API_VERSION}`
const token = `${process.env.AUTH_TOKEN}`
const request = supertest(baseUrl)

export { request, token }
