const express = require('express');
const router = express.Router();

// Importar las rutas específicas
const configurationItemRoutes = require('./configurationItem.routes');
const ciRelationshipRoutes = require('./ciRelationship.routes');
const ciAuditRoutes = require('./ciAudit.routes');

// Definir las rutas principales
router.get('/', (req, res) => {
    res.status(200).send('Hola Mundo');
});

// Usar las rutas específicas
router.use('/configuration-items', configurationItemRoutes);
router.use('/ci-relationships', ciRelationshipRoutes);
router.use('/ci-audits', ciAuditRoutes);

module.exports = router;