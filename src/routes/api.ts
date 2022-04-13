import {Router}  from 'express';
import * as apiController from '../controllers/apiController';

const router = Router();

// Routers Endpoint Test
router.get('/ping', apiController.ping);

// Routers Endpoint User
router.post('/users', apiController.createUser);
router.get('/users', apiController.readUser);
router.get('/users/:id', apiController.getUserById);
router.put('/users/:id', apiController.updateUser);
router.delete('/users/:id', apiController.deleteUser);



export default router;