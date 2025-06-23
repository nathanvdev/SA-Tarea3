import request from 'supertest'
import app from '../src/app.js'

describe('Endpoints de CiAudit', () => {
  let ciId
  let auditId

  beforeAll(async () => {
    // Crea un CI para asociar el audit
    const ciRes = await request(app).post('/api/configuration-items').send({
      name: 'CI para Audit',
      ci_type: 'Software',
      current_status: 'Activo',
      environment: 'DEV',
      security_level: 'Medio',
      compliance_status: 'Cumple'
    })
    ciId = ciRes.body.id
  })

  it('POST /api/ci-audits debe crear un audit', async () => {
    const res = await request(app).post('/api/ci-audits').send({
      ciId,
      fieldName: 'version',
      oldValue: '1.0',
      newValue: '1.1',
      changedBy: 'tester',
      changedAt: new Date()
    })
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('id')
    auditId = res.body.id
  })

  it('GET /api/ci-audits debe devolver los audits', async () => {
    const res = await request(app).get('/api/ci-audits')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('GET /api/ci-audits/:id debe devolver el audit creado', async () => {
    const res = await request(app).get(`/api/ci-audits/${auditId}`)
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('id', auditId)
  })

  it('PUT /api/ci-audits/:id debe actualizar el audit', async () => {
    const res = await request(app)
      .put(`/api/ci-audits/${auditId}`)
      .send({ fieldName: 'description' })
    expect(res.statusCode).toBe(200)
    expect(res.body.fieldName).toBe('description')
  })

  it('DELETE /api/ci-audits/:id debe eliminar el audit', async () => {
    const res = await request(app).delete(`/api/ci-audits/${auditId}`)
    expect(res.statusCode).toBe(204)
  })
})