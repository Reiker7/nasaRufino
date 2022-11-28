const express = require('express')
const mongoose = require('mongoose');
const app = express()

app.use(express.json())
app.use(function(req, res, next){
    console.log("lets go")
    next()
})
async function connection() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/api')
    } 
    catch (err) {
        console.log("no vamos", err)
    }
}

app.get('/api/entries', (req,res) =>{
    // console.log("solicitud recibida");
    pool.query('SELECT title, content, date_, category, name_, surname, image FROM authors AS A INNER JOIN entries AS E ON A.id_author = E.id_author',(err,rows)=>{
        if(err) return res.status(500).send("Keep calm")
        res.json(rows)
    })
})


connection()
app.listen(3000, () => {
    console.log("Server on 3000");
})