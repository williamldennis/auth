import { Router, type Request, type Response } from 'express'
import type { AuthenticatedRequest, LoginRequest, ApiResponse, LoginResponse} from '../types/index.ts'
import { signJWT } from '@/utils/jwt'
import { findUserByUserName } from '../config/database.ts'
import { authenticateToken } from '../middleware/auth.ts'

const router = Router()


//to do @swagger

router.post('/login', (req: Request, res: Response) => {
    console.log('LOGIN attempting login...')

    const { username, password }: LoginRequest = req.body
    
    //validate input
    if(!username || !password) {
        res.status(400).json({
            success: false,
            error: 'Validation failed',
            message: 'Username and password are required'
        } as ApiResponse)
    }

    //find user
    const user = findUserByUserName(username)
    if (!user || user.password !== password) {
        console.log('LOGIN failed');
        res.status(401).json({
            success: false,
            error: 'Authentication failed',
            message: 'Invalid username or password'
        } as ApiResponse)
        
    }

    //sign JWT token 

    const token = signJWT(user)

    //set cookie (HttpOnly for security)
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60, // 1hr
    })

    console.log(`LOGIN successful for ${user.username} (${user.role})`);

    //return success response
    const response: LoginResponse = {
        token, 
        user: {
            id: user.id,
            username: user.username,
            role: user.role,
            createdAt: user.createdAt
        },
        message: 'Login successful'
    }

    res.json({
        success: true,
        data: response,
        message: 'Login successful'
    } as ApiResponse<LoginResponse>)
    
})

//to do @swagger


router.post('/logout', (req: Request, res: Response) => {
    console.log('LOGOUT User logging out...')

    //cleare token cookie
    res.clearCookie('token')

    res.json({
        success: true,
        message: 'Logout successful'
    } as ApiResponse)
})

//todo REST OF FILE
