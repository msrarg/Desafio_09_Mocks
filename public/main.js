const socket = io()

const agregarProductos = document.getElementById('agregarProducto')
const agregarMensajes = document.getElementById('agregarMensaje')

agregarProductos.addEventListener('submit', (e) => {
	e.preventDefault()

	const producto = {
		title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value,
	}

	socket.emit('agregarProducto', producto)

    agregarProductos.reset()
})

async function renderProducto(productos) {
    const template = await fetch('./plantilla/productos.hbs')
    const textTemplate = await template.text()
    const functionTemplate = Handlebars.compile(textTemplate)
    const html = functionTemplate({productos})

    document.querySelector('#productos').innerHTML = html
}
socket.on('productos', renderProducto)

agregarMensajes.addEventListener('submit', (e) => {
	e.preventDefault()

	const mensaje = {
        author: {
		    id: document.getElementById('email').value,
            nombre: document.getElementById('nombre').value,
            apellido: document.getElementById('apellido').value,
            edad: document.getElementById('edad').value,
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        texto: document.getElementById('texto').value,
        fecha: new Date().toLocaleString()
	}

	socket.emit('agregarMensaje', mensaje)
    document.getElementById('texto').value = ''
})

socket.on('mensajes', mensajes => {
    generarTablaMensajes(mensajes);
});

const generarTablaMensajes = (mensajes) => {

    const authorSchema = new normalizr.schema.Entity('authors')
    const messageSchema = new normalizr.schema.Entity('mensajes', {
      author: authorSchema,
    },{idAttribute:'_id'})
    const global = new normalizr.schema.Entity('global', {
      messages: [messageSchema],
    })    
    
    const dataDeno = normalizr.denormalize(mensajes.result,global,mensajes.entities)

    const porcentajeReduccion = Math.floor(
        100 - (JSON.stringify(mensajes).length * 100) / JSON.stringify(dataDeno).length
        )
    
    document.getElementById('porcentaje').innerHTML = porcentajeReduccion;

    const html = dataDeno.messages.map(mensaje => {
        return (`
            <div>
                <b style="color:blue;">${mensaje.author.id}</b>
                [<span style="color:brown;">${mensaje.fecha}</span>] :
                <i style="color:green;">${mensaje.texto}</i>
                <img style="width: 35px;" src="${mensaje.author.avatar}">
            </div>
        `)
    }).join(" ");

    document.getElementById('mensajes').innerHTML = html
}














// async function renderMensaje(mensajes) {
//     console.log(mensajes);
//     const template = await fetch('./plantilla/mensajes.hbs')
//     const textTemplate = await template.text()
//     const functionTemplate = Handlebars.compile(textTemplate)
//     const html = functionTemplate({mensajes})

//     document.querySelector('#mensajes').innerHTML = html
// }
// socket.on('mensajes', renderMensaje)
