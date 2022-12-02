const Nea = require('../models/nea')
const express = require('express')
const router = express.Router()

router.get('/', async (req,res) =>{

    if (!Object.keys(req.query).length){ return res.status(400).send("campo sin valor")
    
    }else if (req.query.class) {
  
    const result = await Nea.find({$expr: { $eq: [{ $toLower: "$orbit_class" }, { $toLower: req.query.class}] } })
    .select('designation period_yr')

    res.send(result)

    }else if (req.query.to && req.query.from) {

        const result = await Nea.find({ year: { $gte: +req.query.from , $lte: +req.query.to} })
            .select('designation discovery_date period_yr')
        res.send(result)
    } else if (req.query.from) {

        const result = await Nea.find({ year: { $gt: +req.query.from } })
            .select('designation discovery_date period_yr')
        res.send(result)
    } else if (req.query.to) {

        const result = await Nea.find({ discovery_date: { $lt: +req.query.to } })
            .select('designation discovery_date period_yr')
        res.send(result)
    } 
})

router.post('/', async (req, res) => {
    const nea = new Nea(req.body)
    console.log(nea)
    const newNea = await nea.save()

    res.send(newNea)
})

router.put('/:designat', async (req, res) => {
    const result = await Nea.findOneAndUpdate({designation: `(${req.params.designat})`}, req.body)

    res.send(result)
})

router.delete('/:designat', async (req, res) => {
    const result = await Nea.findOneAndDelete({ designation: `(${req.params.designat})` })

    res.send(result)
})


module.exports = router