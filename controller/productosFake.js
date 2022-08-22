const fs = require('fs')
const { faker } = require('@faker-js/faker');

faker.locale = 'es';
const productosTest = (req, res) => {
    const productos = [];
    for (let i = 0; i < 5; i++) {         
        productos.push({
            'title':faker.commerce.product(),
            'price': faker.commerce.price(),
            'thumbnail': faker.image.technics(240,240,true)
        });
    }
    res.status(200).json(productos);
}

const productosTestView = async (req, res) => {
    fetch('http://localhost:8080/api/productos-test')
    .then(response => response.json())
    .then(items => {
        res.render('tablaFake.hbs',{items})
    })
}

module.exports = {
    productosTest,
    productosTestView
}