import express from 'express'
import {config} from 'dotenv'

config();

const app = express()

const port = process.env.PORT || 4000
const host = process.env.HOST || 'http://localhost'

app.get('/', (req, res)=>{
    res.send("TESTE");
})

app.listen(port , ()=> console.log(`local url: ${host}:${port}`))