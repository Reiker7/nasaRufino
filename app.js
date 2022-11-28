const express = require('express')
const mongoose = require('mongoose');
const app = express()

app.use(express.json())
const landingsSchema = new mongoose.Schema({
    name:  String, 
    id: String,
    nametype: String,
    reclass:   String,
    mass: String,
    fall: String,
    year: String,
    reclat: String,
    id_deg: String,
    reclong: String,
    geolocatipon: String,
  });
const neasSchema = new mongoose.Schema({
    designation:  String, 
    price: String,
    discovery_date: Date,
    h_mag:   String,
    moid_au: String,
    q_au_1: String,
    q_au_2: String,
    period_ys: String,
    id_deg: String,
    pha: String,
    orbit_class: String,
  });

const Landings = mongoose.model('landings', landingsSchema)
const Neas = mongoose.model('neas', neasSchema)

async function connection() {
    try {
      await mongoose.connect('mongodb://127.0.0.1:27017/nasa')
    } 
    catch (err) {
        console.log("keep calm", err)
    }
}
    //?minimum_mass=200000
    app.get('/api/astronomy/landings', async (req,res) =>{
        await connection()
        let Qsulta = req.query
        console.log(Qsulta.minimum_mass)

        const result = await Landings.find({mass:{$gt: Qsulta.minimum_mass}})
        // .sort('price title')
        .select('price mass')
        
    
    
        // console.log('landings')
        res.send(result)
        
    })
    app.get('/api/astronomy/neas', async (req,res) =>{
        await connection()


        const result = await Neas.find({})


        // console.log('neas')
        res.send(result)
        
    })






app.listen(3000, () => {
    console.log("Server on 3000");
})