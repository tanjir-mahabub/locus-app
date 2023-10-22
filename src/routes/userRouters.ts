import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

// Registration route
router.post('/register', userController.register);

/**
 * Login Route
 */
router.post('/login', userController.login);

export default router;
