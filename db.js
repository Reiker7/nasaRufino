const mongoose = require('mongoose')

module.exports = function () {
    mongoose.connect('mongodb://127.0.0.1:27017/nasa')
    .then(() => console.log("Conectado a mongodb..."))
    .catch(() => console.log("keep calm", err))
}
