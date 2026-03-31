import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
    id: string;
    username: string;
}

// check for jwt, decrypt if found
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // get jwt from cookie
        const authToken: string = req.cookies.authToken;

        // no jwt in cookie
        if (!authToken) throw new Error('No token');

        const decode: JwtPayload = jwt.verify(authToken, process.env.PASSPORT_SECRET) as JwtPayload;
        req.user = decode;
        next();  // user found, continue to next method after middleware
    }
    catch (error) {
        return res.status(401).json({ error: error.message || 'Unauthorized '});
    }
}