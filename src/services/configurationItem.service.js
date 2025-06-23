// src/services/configurationItem.service.js

const { ConfigurationItem } = require('../models/ConfigurationItem');

const createConfigurationItem = async (data) => {
    return await ConfigurationItem.create(data);
};

const getAllConfigurationItems = async () => {
    return await ConfigurationItem.findAll();
};

const getConfigurationItemById = async (id) => {
    return await ConfigurationItem.findByPk(id);
};

const updateConfigurationItem = async (id, data) => {
    const configurationItem = await getConfigurationItemById(id);
    if (configurationItem) {
        return await configurationItem.update(data);
    }
    throw new Error('Configuration Item not found');
};

const deleteConfigurationItem = async (id) => {
    const configurationItem = await getConfigurationItemById(id);
    if (configurationItem) {
        return await configurationItem.destroy();
    }
    throw new Error('Configuration Item not found');
};

module.exports = {
    createConfigurationItem,
    getAllConfigurationItems,
    getConfigurationItemById,
    updateConfigurationItem,
    deleteConfigurationItem,
};