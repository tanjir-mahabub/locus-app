import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

/**
 * Login Route
 */
router.post('/login', userController.login);

export default router;
