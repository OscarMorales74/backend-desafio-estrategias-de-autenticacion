import { Router } from 'express';
import {
  getAllProdCtll,
  getByIdProdCtll,
  createProdCtll,
  updateProdCtll,
  deleteProdCtll,
  } from '../controllers/products.controllers.js';

const router = Router();

//viene peticion desde server.js y se deriva a controllers
router.get('/', getAllProdCtll);
router.get('/:id', getByIdProdCtll);
router.post('/', createProdCtll);
router.put('/:id', updateProdCtll);
router.delete('/:id', deleteProdCtll);

export default router;