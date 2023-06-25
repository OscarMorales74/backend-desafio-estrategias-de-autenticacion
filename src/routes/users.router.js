import { Router } from 'express';
import * as controller from '../controllers/users.controllers.js';
import passport from 'passport';
// import { frontResponseRegister,  frontResponseLogin } from '../passport/local.strategies.js'

const router = Router();

// router.get('/:id', controller.getByIdUserCtll);

router.post('/register', passport.authenticate('register'), controller.registerResponse);

router.post('/login', passport.authenticate('login'), controller.loginResponse);

// router.get('/logout', controller.logoutUserCtll);

router.get('/email/:email', controller.getByEmailUserCtll);

router.put('/updatedocs', controller.updateManyUsersCtll);

export default router;