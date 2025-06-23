// src/controllers/configurationItem.controller.js

const { ConfigurationItem } = require('../models/ConfigurationItem');

// Endpoint para obtener todos los ConfigurationItems
exports.getAllConfigurationItems = async (req, res) => {
    try {
        const items = await ConfigurationItem.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los items de configuración', error });
    }
};

// Endpoint para crear un nuevo ConfigurationItem
exports.createConfigurationItem = async (req, res) => {
    try {
        const newItem = await ConfigurationItem.create(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el item de configuración', error });
    }
};

// Endpoint para obtener un ConfigurationItem por ID
exports.getConfigurationItemById = async (req, res) => {
    try {
        const item = await ConfigurationItem.findByPk(req.params.id);
        if (item) {
            res.status(200).json(item);
        } else {
            res.status(404).json({ message: 'Item no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el item de configuración', error });
    }
};

// Endpoint para actualizar un ConfigurationItem
exports.updateConfigurationItem = async (req, res) => {
    try {
        const [updated] = await ConfigurationItem.update(req.body, {
            where: { id: req.params.id }
        });
        if (updated) {
            const updatedItem = await ConfigurationItem.findByPk(req.params.id);
            res.status(200).json(updatedItem);
        } else {
            res.status(404).json({ message: 'Item no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el item de configuración', error });
    }
};

// Endpoint para eliminar un ConfigurationItem
exports.deleteConfigurationItem = async (req, res) => {
    try {
        const deleted = await ConfigurationItem.destroy({
            where: { id: req.params.id }
        });
        if (deleted) {
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'Item no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el item de configuración', error });
    }
};