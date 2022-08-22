const mongoose = require('mongoose');

const mensajes = new mongoose.Schema({
    author: {
        id: { type: String },
        nombre: { type: String },
        apellido: { type: String },
        edad: { type: Number },
        alias: { type: String },
        avatar: { type: String },
      },
      texto: {type: String},
      fecha: {type: String}
});

module.exports = mongoose.model('mensajes', mensajes)

