// src/controllers/ciAudit.controller.js

const { CiAudit } = require('../models/CiAudit');
const { ConfigurationItem } = require('../models/ConfigurationItem');

// Create a new audit entry
exports.createAudit = async (req, res) => {
    try {
        const { ciId, fieldName, oldValue, newValue, changedBy } = req.body;
        const audit = await CiAudit.create({
            ciId,
            fieldName,
            oldValue,
            newValue,
            changedBy,
        });
        res.status(201).json(audit);
    } catch (error) {
        res.status(500).json({ message: 'Error creating audit entry', error });
    }
};

// Get all audit entries for a specific Configuration Item
exports.getAuditsByCiId = async (req, res) => {
    try {
        const { ciId } = req.params;
        const audits = await CiAudit.findAll({ where: { ciId } });
        res.status(200).json(audits);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching audit entries', error });
    }
};

// Get a specific audit entry by ID
exports.getAuditById = async (req, res) => {
    try {
        const { id } = req.params;
        const audit = await CiAudit.findByPk(id);
        if (!audit) {
            return res.status(404).json({ message: 'Audit entry not found' });
        }
        res.status(200).json(audit);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching audit entry', error });
    }
};

// Update an audit entry
exports.updateAudit = async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await CiAudit.update(req.body, { where: { id } });
        if (!updated) {
            return res.status(404).json({ message: 'Audit entry not found' });
        }
        const updatedAudit = await CiAudit.findByPk(id);
        res.status(200).json(updatedAudit);
    } catch (error) {
        res.status(500).json({ message: 'Error updating audit entry', error });
    }
};

// Delete an audit entry
exports.deleteAudit = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await CiAudit.destroy({ where: { id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Audit entry not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting audit entry', error });
    }
};