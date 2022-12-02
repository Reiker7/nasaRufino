const {User, validate} = require('../models/user')
const express = require('express')
const router = express.Router()
console.log(require('../models/user'))

router.get('/', async (req,res) =>{

    if(!Object.keys(req.query).length) {
        const result = await User.find({})
        res.send(result)
    }else if (req.query.email) {

        const result = await User.find({email: req.query.email } )
        res.send(result)
    }
})

router.post('/create/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const user = new User(req.body)
    console.log(user)
    const newUser = await user.save()

    res.send(newUser)
})

router.put('/edit/:email', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const result = await User.findOneAndUpdate({email: req.params.email}, req.body)

    res.send(result)
})

router.delete('/delete/:email', async (req, res) => {
    const result = await User.findOneAndDelete({ email: req.params.email })

    res.send(result)
})


module.exports = router