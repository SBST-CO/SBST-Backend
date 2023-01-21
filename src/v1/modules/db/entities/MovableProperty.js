const EntitySchema = require('typeorm').EntitySchema

const condition = 'NEW' || 'USED' || 'RECON'

module.exports = new EntitySchema({
    name: 'movable_property',
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
        retailPrice: {
            type: 'decimal',
            precision: 14,
            scale: 2,
            nullable: true,
        },

        description: {
            type: 'text',
            nullable: true
        },

        variantName: {
            type: 'varchar',
            length: 40,
            nullable: true
        },

        variantValue: {
            type: 'varchar',
            length: 100,
            nullable: true,
        },

        retailUrl: {
            type: 'varchar', 
            length: 255,
            nullable: true
        },

        retailerName: {
            type: 'varchar',
            length: 43,
            nullable: true
        },

        condition: {
            type: 'enum',
            enum: ['NEW', 'USED', 'RECON'],
            nullable: false,
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
                foreignKeyConstraintName: 'FK_CREATED_BY_USER_ID'
            }
        }
    }
})