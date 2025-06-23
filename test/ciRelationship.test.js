import request from 'supertest'
import app from '../src/app.js'

describe('Endpoints de CiRelationship', () => {
  let parentCiId
  let childCiId
  let relationshipId

  beforeAll(async () => {
    // Crea dos CIs para la relación
    const parentRes = await request(app).post('/api/configuration-items').send({
      name: 'Parent CI',
      ci_type: 'Hardware',
      current_status: 'Activo',
      environment: 'PROD',
      security_level: 'Alto',
      compliance_status: 'Cumple'
    })
    parentCiId = parentRes.body.id

    const childRes = await request(app).post('/api/configuration-items').send({
      name: 'Child CI',
      ci_type: 'Software',
      current_status: 'Activo',
      environment: 'QA',
      security_level: 'Medio',
      compliance_status: 'Cumple'
    })
    childCiId = childRes.body.id
  })

  it('POST /api/ci-relationships debe crear una relación', async () => {
    const res = await request(app).post('/api/ci-relationships').send({
      parentCiId,
      childCiId,
      relationType: 'depende de'
    })
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('parentCiId', parentCiId)
    expect(res.body).toHaveProperty('childCiId', childCiId)
    relationshipId = res.body.id || res.body.parentCiId // según tu modelo
  })

  it('GET /api/ci-relationships debe devolver las relaciones', async () => {
    const res = await request(app).get('/api/ci-relationships')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/ci-relationships/:id debe devolver la relación creada', async () => {
    const res = await request(app).get(`/api/ci-relationships/${relationshipId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('parentCiId', parentCiId)
    expect(res.body).toHaveProperty('childCiId', childCiId)
  })

  it('PUT /api/ci-relationships/:id debe actualizar la relación', async () => {
    const res = await request(app)
      .put(`/api/ci-relationships/${relationshipId}`)
      .send({ relationType: 'instalado en' })
    expect(res.statusCode).toBe(200)
    expect(res.body.relationType).toBe('instalado en')
  })

  it('DELETE /api/ci-relationships/:id debe eliminar la relación', async () => {
    const res = await request(app).delete(`/api/ci-relationships/${relationshipId}`)
    expect(res.statusCode).toBe(204)
  })
})