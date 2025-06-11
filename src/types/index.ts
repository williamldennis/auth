import { type Request } from 'express'

export interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'basic';
    secret: string;
    createdAat: Date
}

export interface JWTPayload {
    userId: number;
    username: string;
    role: string;
    iat?: number;
    exp?: number
}

