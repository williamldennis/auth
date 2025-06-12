import cors from 'cors'
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { checkAuth } from './middleware/auth';

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

//configure swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: "WD Auth API Docs",
            version: '1.0.0',
            description: 'One of the best APIs honestly'
        },
        servers: [
            { url: 'http://localhost:3000'}
        ]
    },
    apis: ['./src/index.ts', './src/routes/auth.ts']
}

//generate swagger spec
const swaggerDocs = swaggerJsdoc(swaggerOptions)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

/**
 * @swagger
 * /api/public:
 *   get:
 *     summary: Public information
 *     description: All public information lives here
 *     responses:
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: "This is public information"
 */

app.get('/api/public', (req, res) => {
    res.json({ message: "This is public information"}) 
})
/**
 * @swagger
 * /api/protected:
 *   get:
 *     summary: Protected information
 *     description: All protected information lives here
 *     responses:
 *       200:
 *         description: Successful response
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: "Only admins should be able to see this"
 */


app.get('/api/protected', checkAuth, (req, res) => {
    res.json({ message: "Only admins should be able to see this"}) 
})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    console.log(`API docs avail at ${PORT}/api-docs`)
    
})