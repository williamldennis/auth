import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express())

app.get('/api/public', (req, res) => {
    res.json({ message: "This is public information"}) 
})

app.get('/api/protected', (req, res) => {
    res.json({ message: "Only admins should be able to see this"}) 
})

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
    
})