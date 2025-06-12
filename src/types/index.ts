import { type Request } from 'express'

export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'basic';
    secret: string;
    createdAt: Date
}

export interface JWTPayload {
    userId: number;
    username: string;
    role: string;
    iat?: number;
    exp?: number
}

export interface AuthenticatedRequest extends Request {
    user?: User
}

export interface LoginRequest {
    username: string;
    password: string
}

export interface LoginResponse {
    token: string;
    user: Omit<User, 'password' | 'secret'>
    message: string
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string
}