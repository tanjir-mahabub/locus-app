import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

/**
 * Authenticated Request Interface Definition
 */
interface AuthenticatedRequest extends Request {
    user?: { role: string; regionId?: string };
}

/**
 * JWT Token Verification
 * 
 * @param req AuthenticatedRequest
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) return false;

    const token = authHeader.split(' ')[1];

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }

        req.user = decoded as { role: string, regionId?: string };
        next();
    });
}

/**
 * Admin User Authorization
 * 
 * @param req AuthenticatedRequest
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'admin') {
        console.log('userRole', req.user.role);
        return next();
    }
    res.status(403).json({ message: 'Admin access required.' });
};

/**
 * Normal User Authorization
 * 
 * @param req AuthenticatedRequest
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export const isNormalUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'normal') {
        console.log('userRole', req.user.role);
        return next();
    }
    res.status(403).json({ message: 'Normal user access required.' });
};

/**
 * Limited User Authorization
 * 
 * @param req AuthenticatedRequest
 * @param res Response
 * @param next NextFunction
 * @returns void
 */
export const isLimitedUser = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === 'limited') {
        console.log('userRole', req.user.role);
        if (req.user.regionId === '86118093' || req.user.regionId === '86696489' || req.user.regionId === '88186467') {
            return next();
        }
    }
    res.status(403).json({ message: 'Limited user access required.' });
};
