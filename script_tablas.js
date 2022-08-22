const Contenedor = require('./models/ClassContenedor')
const {optionsMdb} = require('./options/options')

const mysql = new Contenedor(optionsMdb, 'productos');

(async() =>{
    try {
        const existeTablaProducto = await mysql.knex.schema.hasTable('productos')
        if (!existeTablaProducto) {
            console.log('Se crea la tabla productos!')
            await mysql.knex.schema.createTable('productos', table => {
                table.increments('id').primary().notNull(),
                table.string('title',50).notNull(),
                table.float('price').notNull(),
                table.string('thumbnail',500)
            })
        }
        else{
            console.log('La Tabla Productos ya se encuentra Creada!')
        }   
        await sqlite3.knex.destroy();
        await mysql.knex.destroy();
    } catch (error) {
        console.log(error)
    }

})();
