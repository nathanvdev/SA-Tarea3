import sequelize from './config/database.js'
import ConfigurationItem from './models/ConfigurationItem.js'

// Si tus modelos CiRelationship y CiAudit están en formato CommonJS, impórtalos así:
import { DataTypes } from 'sequelize'
import CiRelationshipDef from './models/CiRelationship.js'
import CiAuditDef from './models/CiAudit.js'

const CiRelationship = CiRelationshipDef(sequelize, DataTypes)
const CiAudit = CiAuditDef(sequelize, DataTypes)

async function seed() {
  try {
    await sequelize.sync({ force: true }) // Borra y crea las tablas

    // Cargar ConfigurationItems
    const ci1 = await ConfigurationItem.create({
      name: 'Servidor1',
      ci_type: 'Hardware',
      description: 'Servidor físico principal',
      serial_number: 'ABC123',
      version: 'v1.0',
      acquisition_date: new Date('2022-01-01'),
      current_status: 'Activo',
      environment: 'PROD',
      physical_location: 'Data Center 1',
      owner: 'Juan Pérez',
      license_number: 'LIC-001',
      license_expiration_date: new Date('2025-01-01'),
      security_level: 'Alto',
      compliance_status: 'Cumple',
      configuration_status: 'Aprobado',
      documentation_link: 'http://docs.servidor1.com',
      incident_links: ['http://incidentes/1', 'http://incidentes/2'],
      last_change_date: new Date('2023-01-01'),
      last_change_description: 'Actualización de firmware'
    })

    const ci2 = await ConfigurationItem.create({
      name: 'AplicaciónX',
      ci_type: 'Software',
      description: 'Aplicación de gestión',
      serial_number: 'SW-456',
      version: '2.3.1',
      acquisition_date: new Date('2023-02-15'),
      current_status: 'Activo',
      environment: 'QA',
      physical_location: 'Servidor1',
      owner: 'Ana Gómez',
      license_number: 'LIC-002',
      license_expiration_date: new Date('2024-12-31'),
      security_level: 'Medio',
      compliance_status: 'Cumple',
      configuration_status: 'Aprobado',
      documentation_link: 'http://docs.aplicacionx.com',
      incident_links: [],
      last_change_date: new Date('2023-03-01'),
      last_change_description: 'Actualización menor'
    })

    // Cargar CiRelationship
    await CiRelationship.create({
      parentCiId: ci1.id,
      childCiId: ci2.id,
      relationType: 'instalado en'
    })

    // Cargar CiAudit
    await CiAudit.create({
      ciId: ci1.id,
      fieldName: 'version',
      oldValue: 'v0.9',
      newValue: 'v1.0',
      changedBy: 'admin',
      changedAt: new Date('2023-01-01')
    })

    console.log('Datos de ejemplo cargados correctamente.')
    process.exit(0)
  } catch (error) {
    console.error('Error al cargar datos de ejemplo:', error)
    process.exit(1)
  }
}

seed()