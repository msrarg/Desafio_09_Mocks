module.exports= class Contenedor {

    constructor(objetoKenex, nombreTabla) {
        this.objetoKenex = objetoKenex
        this.nombreTabla = nombreTabla
        this.knex = require('knex')(this.objetoKenex);
    }

    async getAll() {
        try{
            return this.knex.from(this.nombreTabla).select('*');
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

    async save(item) {
        try{
            await this.knex(this.nombreTabla).insert(item)
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }

}