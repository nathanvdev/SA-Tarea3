import request from 'supertest'
import app from '../src/app'

describe('Endpoints de ConfigurationItem', () => {
  let createdId

  it('GET /api/configuration-items debe devolver 200', async () => {
    const res = await request(app).get('/api/configuration-items')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/configuration-items debe crear un nuevo item', async () => {
    const data = {
      name: 'Test CI',
      ci_type: 'Software',
      current_status: 'Activo',
      environment: 'DEV',
      security_level: 'Medio',
      compliance_status: 'Cumple'
    }
    const res = await request(app).post('/api/configuration-items').send(data)
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    createdId = res.body.id
  })

  it('GET /api/configuration-items/:id debe devolver el item creado', async () => {
    const res = await request(app).get(`/api/configuration-items/${createdId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('id', createdId)
  })

  it('PUT /api/configuration-items/:id debe actualizar el item', async () => {
    const res = await request(app)
      .put(`/api/configuration-items/${createdId}`)
      .send({ name: 'CI Actualizado' })
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe('CI Actualizado')
  })

  it('DELETE /api/configuration-items/:id debe eliminar el item', async () => {
    const res = await request(app).delete(`/api/configuration-items/${createdId}`)
    expect(res.statusCode).toBe(204)
  })
})