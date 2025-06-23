// ciAudit.routes.js
const express = require('express');
const router = express.Router();
const ciAuditController = require('../controllers/ciAudit.controller');

// Define las rutas para CiAudit
router.get('/', ciAuditController.getAllAudits);
router.post('/', ciAuditController.createAudit);
router.get('/:id', ciAuditController.getAuditById);
router.put('/:id', ciAuditController.updateAudit);
router.delete('/:id', ciAuditController.deleteAudit);

module.exports = router;