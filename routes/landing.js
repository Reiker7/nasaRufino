const Landing = require('../models/landing')
const express = require('express')
const router = express.Router()

router.get('/', async (req,res) =>{
    if(!Object.keys(req.query).length) return res.status(400).send("campo sin valor")

    const result = await Landing.find({"$expr" : {"$gt" : [{"$toDecimal" :"$mass"} , +req.query.minimum_mass]}})
    
    .select('name mass')
    
    res.send(result)
    //{year: {$regex: /1960/}}
})
router.get('/mass/:mass', async (req,res) =>{
    
    const result = await Landing.find({"$expr" : {"$eq" : [{"$toDecimal" :"$mass"} , +req.params.mass]}})
    .select('name mass')
    
    res.send(result)
    
})
router.get('/class/:class', async (req,res) =>{

    const result = await Landing.find({recclass: req.params.class})
    .select('name recclass')
    
    res.send(result)
    
})



// router.post('/', async (req, res) => {
//     const movie = new Movie(req.body)

//     const newMovie = await movie.save()

//     res.send(newMovie)
// })

// router.put('/:id', async (req, res) => {
//     const movie = await Movie.findOneAndUpdate({_id: req.params.id}, req.body)

//     res.send(movie)
// })

// router.delete('/:id', async (req, res) => {
//     const movie = await Movie.findOneAndDelete({_id: req.params.id})

//     res.send(movie)
// })

module.exports = router