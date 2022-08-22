const express = require('express')
require('dotenv').config();
const {Server: HttpServer} = require('http')
const {Server: IOServer} = require('socket.io')
const {optionsMdb} = require('./options/options')
const {connetionMG} = require('./DB/connectionMG')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const Contenedor = require('./models/ClassContenedor')
const ContenedorMongoDB = require('./models/ClassMongo')
const Producto = require('./models/ClassProducto') 
const Normalizr = require('./models/ClassNormalizr') 

const productos = new Contenedor(optionsMdb, 'productos')
const mensajes = new ContenedorMongoDB()
const normalizr = new Normalizr()

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())

app.use('/api/productos-test', require('./routes/productos'));

io.on('connection', async socket => {
	console.log('Se conecto un usuario!')

	socket.emit('productos', await productos.getAll())

	socket.on('agregarProducto', async data => {
        let producto = new Producto(data.title, data.price, data.thumbnail)
		await productos.save(producto)
		io.sockets.emit('productos', await productos.getAll())
	})

	const mensajesMG = await mensajes.getAll()
	const mensajesNormalizr = normalizr.getDataNormalizer(mensajesMG)

	socket.emit('mensajes', mensajesNormalizr)

	socket.on('agregarMensaje', async mensaje => {
		try {
            await mensajes.save(mensaje)    
        } catch (error) {
            console.log(error);
        }

		const mensajesMG = await mensajes.getAll()
		const mensajesNormalizr = normalizr.getDataNormalizer(mensajesMG)

		io.sockets.emit('mensajes', mensajesNormalizr)
	})
})

httpServer.listen(process.env.PORT, () => console.log(`Server on Port ${process.env.PORT}`))
