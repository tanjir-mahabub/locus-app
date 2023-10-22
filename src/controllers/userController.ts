import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IUser, users } from '../models/userModel';

/**
 * Admin User Authorization
 * 
 * @param req Request
 * @param res Response
 * @returns void
 */
export const login = (req: Request, res: Response) => {
    const { username, password } = req.body;

    console.log('login request', req);

    /**
     * User Name Verification
     */
    const user = users.find((u) => u.username === username);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) return false;

    /**
     * Password Verification
     */
    bcrypt.compare(password, user.password, (err, passwordMatch) => {
        if (err || !passwordMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        /**
         * Generate JWT Token
         */
        const token = jwt.sign(
            { sub: user.username, username: user.username, role: user.role },
            secret,
            { expiresIn: '1h' }
        );

        res.json({ token });
    });
};

// User registration
export const register = (req: Request, res: Response) => {
    const { username, password, role } = req.body;

    // Check if the username already exists
    const existingUser = users.find((u) => u.username === username);

    if (existingUser) {
        return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Registration failed' });
        }

        // Create a new user
        const user: IUser = { username, password: hashedPassword, role };
        users.push(user);

        res.status(201).json({ message: 'User registered successfully' });
    });
};
