import {Router}  from 'express';
import * as apiController from '../controllers/apiController';
//import { Auth } from '../middleware/auth';
import { privateRoute } from '../config/passport_jwt';

const router = Router();

// Routers Endpoint Test
router.get('/ping', apiController.ping);

// Routers Endpoint Auth
router.post('/register', apiController.registerUser);
router.post('/login', apiController.loginUser);

// Private User Route
router.post('/users', privateRoute, apiController.createUser);
router.get('/users', privateRoute, apiController.readUser);
router.get('/users/:id', privateRoute, apiController.getUserById);
router.put('/users/:id', privateRoute, apiController.updateUser);
router.delete('/users/:id', privateRoute, apiController.deleteUser);

// Private Movie Route



export default router;