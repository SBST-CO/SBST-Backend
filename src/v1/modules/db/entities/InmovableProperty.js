const EntitySchema = require('typeorm').EntitySchema

const condition = 'NEW' || 'USED' || 'RECON'

module.exports = new EntitySchema({
    name: 'inmovable_property',
    columns: {
        id: {
            type:"mediumint",
            primary: true,
            generated: 'increment',
            unique: true
        },
        name: {
            type: 'varchar',
            length: 45,
            nullable: false
        },
        marketPrice: {
            type: 'decimal',
            precision: 14,
            scale: 2,
            nullable: true,
        },

        description: {
            type: 'text',
            nullable: true
        },

        type: {
            type: 'enum',
            enum: ['APT', 'CAS', 'OFI', 'LOC'],
            nullable: false
        },

        coordinates: {
            type: 'varchar',
            length: 255,
            nullable: true,
        },

        sourceMaps: {
            type: 'varchar',
            length: 255,
            nullable: true,
        },

        city: {
            type: 'varchar', 
            length: 100,
            nullable: false
        },

        address: {
            type: 'varchar',
            length: 100,
            nullable: true
        },

        area: {
            type: 'integer',
            nullable: true,
        },
        
        roomsNum: {
            type: 'smallint',
            nullable: true
        },

        createdAt: {
            createDate: true,
            nullable: false
        },
        updatedAt: {
            updateDate: true,
            nullable: false
        }

    },
    relations: {
        createdBy: {
            target: 'user',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: {
                foreignKeyConstraintName: 'FK_CREATED_BY_USER_ID_INMOVABLE_PROPERTY'
            }
        },
        images: {
            target: 'property_images',
            type: 'one-to-many',
            cascade: true,
            inverseSide: 'inmovablePropertyId'
        }
    }
})