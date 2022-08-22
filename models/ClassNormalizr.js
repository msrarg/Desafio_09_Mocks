const normalizr = require('normalizr');

class Normalizer {

    getDataNormalizer(dataANormalizar) {
        const messages = JSON.parse(JSON.stringify(dataANormalizar));
        const authorSchema = new normalizr.schema.Entity('authors')
        const messageSchema = new normalizr.schema.Entity('mensajes', {
          author: authorSchema,
        },{idAttribute:'_id'})
        const global = new normalizr.schema.Entity('global', {
          messages: [messageSchema],
        })

        const data = { id: 'mensajes', messages }

        const dataNormalizada = normalizr.normalize(data, global)

        // console.log(dataNormalizada.id);

        return dataNormalizada;
    }

}

module.exports = Normalizer