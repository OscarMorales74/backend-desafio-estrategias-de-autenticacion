import { Router } from 'express';
import * as controller from '../controllers/users.controllers.js';
import passport from 'passport';
// import { frontResponseRegister,  frontResponseLogin } from '../passport/local.strategies.js'

const router = Router();

// router.get('/:id', controller.getByIdUserCtll);

router.post('/register', passport.authenticate('register'), controller.registerResponse);

router.post('/login', passport.authenticate('login'), controller.loginResponse);

//scope extrae los datos
router.get('/register-github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/profile-github', passport.authenticate('github', { scope: [ 'user:email' ]}), (req, res) => {res.send('ok')});

router.get('/email/:email', controller.getByEmailUserCtll);

router.put('/updatedocs', controller.updateManyUsersCtll);

export default router;