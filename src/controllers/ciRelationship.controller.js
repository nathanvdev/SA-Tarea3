// Este archivo contiene la lógica de negocio para manejar las solicitudes relacionadas con CiRelationship.

const { CiRelationship } = require('../models/CiRelationship');
const { ConfigurationItem } = require('../models/ConfigurationItem');

exports.createCiRelationship = async (req, res) => {
    const { parentCiId, childCiId, relationType } = req.body;
    try {
        // Verificar si los CIs existen
        const parentCi = await ConfigurationItem.findByPk(parentCiId);
        const childCi = await ConfigurationItem.findByPk(childCiId);

        if (!parentCi || !childCi) {
            return res.status(404).json({ message: 'Configuration Item no encontrado' });
        }

        // Crear la relación
        const newRelationship = await CiRelationship.create({
            parentCiId,
            childCiId,
            relationType
        });

        res.status(201).json(newRelationship);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la relación', error });
    }
};

// Obtener todas las relaciones
exports.getCiRelationships = async (req, res) => {
    try {
        const relationships = await CiRelationship.findAll();
        res.status(200).json(relationships);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las relaciones', error });
    }
};

// Crear una nueva relación
exports.createRelationship = async (req, res) => {
    const { parentCiId, childCiId, relationType } = req.body;

    try {
        const newRelationship = await CiRelationship.create({ parentCiId, childCiId, relationType });
        res.status(201).json(newRelationship);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la relación', error });
    }
};

// Obtener una relación por ID
exports.getCiRelationshipById = async (req, res) => {
    const { id } = req.params;

    try {
        const relationship = await CiRelationship.findByPk(id);
        if (!relationship) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }
        res.status(200).json(relationship);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la relación', error });
    }
};

// Actualizar una relación
exports.updateCiRelationship = async (req, res) => {
    const { id } = req.params;
    const { parentCiId, childCiId, relationType } = req.body;

    try {
        const relationship = await CiRelationship.findByPk(id);
        if (!relationship) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }

        relationship.parentCiId = parentCiId;
        relationship.childCiId = childCiId;
        relationship.relationType = relationType;

        await relationship.save();
        res.status(200).json(relationship);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la relación', error });
    }
};

// Eliminar una relación
exports.deleteCiRelationship = async (req, res) => {
    const { id } = req.params;

    try {
        const relationship = await CiRelationship.findByPk(id);
        if (!relationship) {
            return res.status(404).json({ message: 'Relación no encontrada' });
        }

        await relationship.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la relación', error });
    }
};