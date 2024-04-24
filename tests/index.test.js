const request = require('supertest')
const baseUrl = 'http://localhost:3000/deliveries'


describe('GET /:trackingNumber - Obter informação do rastreio', () => {
    const newDelivery = {
        trackingNumber: '10',
        status: 'Pedido em preparação'
    }

    beforeAll(async () => {
        await request(baseUrl).post('/').send(newDelivery)
    })

    afterAll(async () => {
        await request(baseUrl).delete(`/${newDelivery.trackingNumber}`)
    })

    it('Deve retornar o delivery 10', async () => {
        const response = await request(baseUrl).get(`/${newDelivery.trackingNumber}`);
        expect(response.statusCode).toBe(200)
        expect(response.body.trackingNumber).toBe('10');
    })

    it('Deve retornar "Delivery not found"', async () => {
        const response = await request(baseUrl).get(`/0`);
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('Delivery not found');
    })
});

describe('POST / - Criando um rastreio', () => {
    const newDelivery = {
        trackingNumber: '10',
        status: 'Saiu para entrega'
    }

    afterAll(async () => {
        await request(baseUrl).delete(`/${newDelivery.trackingNumber}`)
    })

    it('Deve retornar o objeto criado', async () => {
        const response = await request(baseUrl).post('/').send(newDelivery)
        expect(response.statusCode).toBe(200)
        expect(response.body.trackingNumber).toBe(newDelivery.trackingNumber)
    })

    it('Deve retornar "Failed to create delivery"', async () => {
        const response = await request(baseUrl).post('/').send('dados inválidos')
        expect(response.statusCode).toBe(500)
        expect(response.body.error).toBe('Failed to create delivery')
    })
})

describe('/PUT /:trackingNumber - Atualiza as informações do rastreio', () => {
    const newDelivery = {
        trackingNumber: '10',
        status: 'Saiu para entrega'
    }

    const newStatus = {
        status: 'Entregue'
    }

    beforeAll(async () => {
        await request(baseUrl).post('/').send(newDelivery)
    })

    afterAll(async () => {
        await request(baseUrl).delete(`/${newDelivery.trackingNumber}`)
    })

    it('Deve retornar o objeto atualizado', async () => {
        const response = await request(baseUrl).put(`/${newDelivery.trackingNumber}`).send(newStatus)
        expect(response.statusCode).toBe(200)
        expect(response.body.status).toBe(newStatus.status)
    })

    it('Deve retornar "Delivery not found"', async () => {
        const response = await request(baseUrl).put('/0').send(newStatus.status)
        expect(response.statusCode).toBe(404)
        expect(response.body.error).toBe('Delivery not found')
    })
})