//configuração inicial
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app =  express()

// forma de ler Json / middlewares 
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/',(req, res) =>{

//mostrar req

res.json({message: 'Oi express!'})

})

//senhaBanco 9DXJmtmqt71e6A1t
// mongodb+srv://Thiago:9DXJmtmqt71e6A1t@apicluster.h8dqy.mongodb.net/bancodaapi?retryWrites=true&w=majority

//entregar uma porta
const DB_USER=process.env.DB_USER
const DB_PASSWORD= encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.h8dqy.mongodb.net/bancodaapi?retryWrites=true&w=majority`
)
.then(() =>{
    console.log('conectamos ao mongoBD')
    app.listen(3000)
})
.catch((err) => console.log(err))

