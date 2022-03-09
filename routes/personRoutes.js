const router = require('express').Router()

const { append, json } = require('express/lib/response')
const { name } = require('tar/lib/types')
const { db } = require('../models/Person')
const Person = require ('../models/Person')

//CREATE - Criação de dados
router.post('/', async (req, res) =>{

    const {nome, dia, mes, existe } = req.body

    if (!nome){
        res.status(422).json({error:'nome obrigatório'})
        return
    }

    const person ={
        nome,
        dia,
        mes,
        existe,
    }

     try{
        await Person.create(person)
        res.status(201).json({message: 'pessoa inserida na agenda com sucesso'})

     }catch(erro){
         res.status(500).json({Error: erro})
  
     }
 
})

//READ - Leitura de todos os dados
router.get('/', async (req, res) => {
    
    try{
      const people = await Person.find()
      res.status(200).json(people)

     }catch(erro){
         res.status(500).json({Error: erro})
  
     }

})

//READ - busca por um dado em especifico
router.get('/:id', async(req, res) =>{

    // extrair o dado da requisição pela url = req.params
    const id = req.params.id
 
 try{
     const person = await Person.findOne({_id: id})

        if(!person){
            res.status(422).json({message:'usuario nao foi encontrado'})
            return
        }
     
     res.status(200).json(person)

 }catch(error){
     res.status(500).json({Error: error})

 }

})

//READ - ler todos os dados de um nome em especifico
router.get('/:nome', (req, res) =>{

        try{

 
          res.status(200).json(res)
            
         }catch(erro){
             res.status(500).json({Error: erro})
      
         }
    
    })



//UPDATE - atualização de dados PUT e PATCH
router.patch('/:id', async (req, res) => {
    const id = req.params.id
    const{nome, dia, mes, existe} = req.body

    const person ={
        nome,
        dia,
        mes,
        existe,

    }
    try{
    const updatedPerson = await Person.updateOne({_id: id}, person)
    res.status(422).json({message:'o usuário não foi encontrado'})
    return

    if(updatedPerson.matchedCount ===0){

    }
    res.status(200).json(person)

    }catch(error){
        res.status(500).json({Error: error})

    }

})

//DELETE - deletar dados

router.delete('/:id', async (req, res) =>{
    const id= req.params.id

    const person = await Person.findOne({_id: id})

    if(!person){
        res.status(422).json({message:'usuário não encontrado'})
        return
    }

try{

    await Person.deleteOne({_id: id})
    res.status(200).json({message: 'usuário removido com sucesso'})

}catch(error){
    res.status(500).json({Error: error})

}


})


module.exports = router
