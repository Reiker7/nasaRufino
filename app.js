const landing = require('./routes/landing')
const nea = require('./routes/nea')
const user = require('./routes/user')
const express = require('express')
const app = express()

require('./db')()

app.use(express.json())

app.use('/api/astronomy/landings', landing)
app.use('/api/astronomy/neas', nea)
app.use('/api/user', user)

app.get('/ping', (req, res) => {
    res.send('pong')
})


app.listen(3000, () => {
    console.log("Server on 3000");
})