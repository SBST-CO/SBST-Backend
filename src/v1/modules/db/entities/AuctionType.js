const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'auction_type',
    columns: {
        code: {
            type: 'varchar',
            length: 10,
            unique: true,
            primary: true
        },

        name: {
            type: 'varchar',
            length: 100,
        }
    }
})