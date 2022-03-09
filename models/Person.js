const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    nome: String,
    dia: Number,
    mes: Number,
    existe: Boolean
})

module.exports = Person