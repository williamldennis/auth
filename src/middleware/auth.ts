


const users = [
  { id: 1, username: "admin", password: "admin123", role: "admin", secret: "admin-secret-123" },
  { id: 2, username: "user", password: "user123", role: "basic", secret: "user-secret-456" }
];


export const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization

    const token = authHeader.split(' ')[1]

    const user = users.find( u => u.secret === token)
    
    if (user && user.role === "admin") {
        next()
    } else
    res.status(401).json({error: 'Not authorized'})
}
