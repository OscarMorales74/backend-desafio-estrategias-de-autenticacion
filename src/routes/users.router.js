import { Router } from 'express';
import * as controller from '../controllers/users.controllers.js';

const router = Router();

router.get('/all', controller.getAllUsersCtll);

router.post('/file', controller.createFileUsersCtll);

router.get('/', controller.getByNameUserCtll);

// router.get('/:id', controller.getByIdUserCtll);

router.post('/register', controller.createUserCtll);

router.post('/login', controller.loginUserCtll);

// router.get('/logout', controller.logoutUserCtll);

router.get('/aggregation1', controller.aggregation1);

router.get('/email/:email', controller.getByEmailUserCtll);

router.put('/updatedocs', controller.updateManyUsersCtll);

export default router;