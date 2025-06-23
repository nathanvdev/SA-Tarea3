import express from 'express';
import { createCiRelationship, getCiRelationships, getCiRelationshipById, updateCiRelationship, deleteCiRelationship } from '../controllers/ciRelationship.controller.js';

const router = express.Router();

// Define las rutas para CiRelationship
router.post('/', createCiRelationship);
router.get('/', getCiRelationships);
router.get('/:id', getCiRelationshipById);
router.put('/:id', updateCiRelationship);
router.delete('/:id', deleteCiRelationship);

export default router;