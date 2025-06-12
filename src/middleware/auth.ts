
import type { Request, Response, NextFunction } from 'express';
import type { AuthenticatedRequest } from '../types/index.ts';
import { verifyJWT, getTokenFromRequest } from '@/utils/jwt.ts';
import { findUserById, findUserBySecret, users } from '../config/database.ts'



//steps 4-5

export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    const token = authHeader.split(' ')[1]

    const user = users.find( u => u.secret === token)
    
    if (user && user.role === "admin") {
        next()
    } else
    res.status(401).json({error: 'Not authorized'})
}


//steps 8-10

export const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log('AUTH using jwt based auth');

    //get token from request header
    const token = getTokenFromRequest(req)

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Access denied. No token provided',
            message: 'Provide JWT token in auth header (Bearer <token> or cookie'
        })
    }

    //verify jwt token
    const decoded = verifyJWT(token)
    if (!decoded) {
        return res.status(401).json({
            success: false,
            error: 'User nor found',
            message: 'User associated with token no longer exists'
        })
    }

    // get fresh user data from db
    const user = findUserById(decoded.userId)
    if (!user) {
        return res.status(401).json({
            success: false, 
            error: 'User not found',
            message: 'User associated with token no longer exists'
        })
    }

    //attach fresh user data to request 
    req.user = user
    console.log('AUTH user authenticated');
    next()
    
}
// middleware to check if authenticated (any role)

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
        return res.status(401).json({
            success:false, 
            error: 'Authentication required',
            message: 'You must be logged in to access this resource'
        })
    }

    console.log(`AUTH authenticated access granted`);
    next()
}