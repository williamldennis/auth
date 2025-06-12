import type { User } from '../types/index';

//in memory users
export const users: User[] = [
    {
        id: 1,
        username: 'admin',
        password: 'admin123', // In real apps, this would be hashed
        role: 'admin',
        secret: 'admin-secret-123',
        createdAt: new Date('2024-01-01')
    },
    {
        id: 2,
        username: 'user',
        password: 'user123', // In real apps, this would be hashed
        role: 'basic',
        secret: 'user-secret-456',
        createdAt: new Date('2024-01-01')
    }
];

///helper for user management
export const findUserByUserName= (username: string): User | undefined => {
    return users.find(user => user.username === username)
}

export const findUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id)
}

export const findUserBySecret = (secret: string): User | undefined => {
    return users.find(user => user.secret === secret)
}