import { Router } from 'express';
import * as userController from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login
 *     description: Logs in a user and returns a JWT token.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *             required:
 *               - username
 *               - password
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The JWT token for the logged-in user.
 *       '401':
 *         description: Unauthorized login
 */
router.post('/login', userController.login);

export default router;
