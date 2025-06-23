// src/services/ciRelationship.service.js

const { CiRelationship } = require('../models/CiRelationship');
const { ConfigurationItem } = require('../models/ConfigurationItem');

const createRelationship = async (parentCiId, childCiId, relationType) => {
    try {
        const relationship = await CiRelationship.create({ parentCiId, childCiId, relationType });
        return relationship;
    } catch (error) {
        throw new Error('Error creating relationship: ' + error.message);
    }
};

const getRelationshipsByParent = async (parentCiId) => {
    try {
        const relationships = await CiRelationship.findAll({
            where: { parentCiId },
            include: [{ model: ConfigurationItem, as: 'Children' }]
        });
        return relationships;
    } catch (error) {
        throw new Error('Error fetching relationships: ' + error.message);
    }
};

const getRelationshipsByChild = async (childCiId) => {
    try {
        const relationships = await CiRelationship.findAll({
            where: { childCiId },
            include: [{ model: ConfigurationItem, as: 'Parents' }]
        });
        return relationships;
    } catch (error) {
        throw new Error('Error fetching relationships: ' + error.message);
    }
};

const deleteRelationship = async (id) => {
    try {
        const result = await CiRelationship.destroy({ where: { id } });
        return result > 0;
    } catch (error) {
        throw new Error('Error deleting relationship: ' + error.message);
    }
};

module.exports = {
    createRelationship,
    getRelationshipsByParent,
    getRelationshipsByChild,
    deleteRelationship
};