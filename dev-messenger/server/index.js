const PORT = 8000
const express = require('express')
const bcrypt = require('bcrypt')
const { v1: uuidv1} = require('uuid')
const { connect } = require('getstream')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const APP_ID = '1204534'
const API_KEY = '5uzparpdtaxp'
const API_SECRET = '7u96k7gdd73pjjyp6p8nmt88ykb59renv6422hk3vus9pbgm854d696j44h93aka'

//sign up
app.post('/signup', async (req,res) => {
    try{
        const { username, password } = req.body

        const userId = uuidv1();
        const hashedPassword = await bcrypt.hash(password, 10)
        const client = connect(API_KEY, API_SECRET, APP_ID)
        const token = client.createUserToken(userId)

        res.status(200).json({ username, password, userId, hashedPassword, token})
        
        console.log(username, password)
    } catch(error) {
        console.log(error)

        res.status(500).json({message: error})
    }
})

app.listen(PORT, () => console.log('Server running on PORT ' + PORT))

