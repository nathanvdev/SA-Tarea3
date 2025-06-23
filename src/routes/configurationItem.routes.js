import express from 'express';
import { getAllConfigurationItems, createConfigurationItem } from '../controllers/configurationItem.controller.js';

const router = express.Router();

// Ruta para obtener todos los Configuration Items
router.get('/', getAllConfigurationItems);

// Ruta para crear un nuevo Configuration Item
router.post('/', createConfigurationItem);

export default router;