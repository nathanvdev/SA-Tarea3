// src/services/ciAudit.service.js

const { CiAudit } = require('../models/CiAudit');

const createAudit = async (ciId, fieldName, oldValue, newValue, changedBy) => {
    try {
        const audit = await CiAudit.create({
            ciId,
            fieldName,
            oldValue,
            newValue,
            changedBy,
        });
        return audit;
    } catch (error) {
        throw new Error('Error creating audit: ' + error.message);
    }
};

const getAuditsByCiId = async (ciId) => {
    try {
        const audits = await CiAudit.findAll({
            where: { ciId },
        });
        return audits;
    } catch (error) {
        throw new Error('Error fetching audits: ' + error.message);
    }
};

const updateAudit = async (id, updatedFields) => {
    try {
        const [updated] = await CiAudit.update(updatedFields, {
            where: { id },
        });
        return updated ? await CiAudit.findByPk(id) : null;
    } catch (error) {
        throw new Error('Error updating audit: ' + error.message);
    }
};

const deleteAudit = async (id) => {
    try {
        const deleted = await CiAudit.destroy({
            where: { id },
        });
        return deleted;
    } catch (error) {
        throw new Error('Error deleting audit: ' + error.message);
    }
};

module.exports = {
    createAudit,
    getAuditsByCiId,
    updateAudit,
    deleteAudit,
};