const Landing = require('../models/landing')
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    if (!Object.keys(req.query).length){ return res.status(400).send("campo sin valor")

    }else if (req.query.minimum_mass) {
        const result = await Landing.find({ "$expr": { "$gt": [{ "$toDecimal": "$mass" }, +req.query.minimum_mass] } })
            .select('name mass')
        res.send(result)
    } else if (req.query.to && req.query.from) {

        const result = await Landing.find({ year: { $gte: +req.query.from , $lte: +req.query.to} })
            .select('name mass year')
        res.send(result)
    } else if (req.query.from) {

        const result = await Landing.find({ year: { $gt: +req.query.from } })
            .select('name mass year')
        res.send(result)
    } else if (req.query.to) {

        const result = await Landing.find({ year: { $lt: +req.query.to } })
            .select('name mass year')
        res.send(result)
    }

})
router.get('/mass/:mass', async (req, res) => {

    const result = await Landing.find({ "$expr": { "$eq": [{ "$toDecimal": "$mass" }, +req.params.mass] } })
        .select('name mass')

    res.send(result)

})
router.get('/class/:class', async (req, res) => {

    const result = await Landing.find({ recclass: req.params.class })
        .select('name recclass')

    res.send(result)

})


router.post('/', async (req, res) => {
    const landing = new Landing(req.body)
    console.log(landing)
    const newLanding = await landing.save()

    res.send(newLanding)
})

router.put('/:id', async (req, res) => {
    const landing = await Landing.findOneAndUpdate({ id: req.params.id }, req.body)
    console.log(req.params.id)
    res.send(landing)
})

router.delete('/:id', async (req, res) => {
    const landing = await Landing.findOneAndDelete({ id: req.params.id })

    res.send(landing)
})

module.exports = router