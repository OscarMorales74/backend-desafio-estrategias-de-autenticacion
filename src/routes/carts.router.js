import { Router } from "express";
import {
    getAllCartsCtll,
    getCartCtll,
    createCartCtll,
    addProdToCartCtll,
    delProdFromCartCtll
} from '../controllers/carts.controllers.js';

const router = Router();


router.get('/', getAllCartsCtll);
router.get('/:cId', getCartCtll);
router.post('/', createCartCtll);
router.put('/:cId/:pId', addProdToCartCtll);
router.delete('/:cId/:pId', delProdFromCartCtll)

export default router