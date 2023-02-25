const EntitySchema = require('typeorm').EntitySchema


module.exports = new EntitySchema({
    name: 'property_images',
    columns: {
        id: {
            type: 'mediumint',
            primary: true,
            generated: 'increment',
            unique: true
        },
        url: {
            type: 'varchar',
            length: 255,
            nullable: false
        },
        isMain: {
            type: 'boolean',
            default: false,
            
        },
        MIMETYPE: {
            type: 'varchar',
            length: 50,
            nullable: true,
        },
        createdAt: {
            createDate: true,
            nullable: false
        }
    },
    relations: {
        movablePropertyId: {
            target: 'movable_property',
            type: 'many-to-one',
            joinColumn: {
                name: 'mov_prop_id',
                foreignKeyConstraintName: 'MOV_PROPERTY_ID_FK'
            },
            onDelete: 'CASCADE',
            inverseSide: 'images'
        },
        inmovablePropertyId: {
            target: 'inmovable_property',
            type: 'many-to-one',
            joinColumn: {
                name: 'inmov_prop_id',
                foreignKeyConstraintName: 'INMOV_PROPERTY_ID_FK'
            },
            onDelete: 'CASCADE',
            inverseSide: 'images'
        }
    }
})