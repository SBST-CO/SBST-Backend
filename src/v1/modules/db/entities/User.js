const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'user',
    uniques: [
        { name: 'UN_userName', columns: ['userName'] },
        { name: 'UN_email', columns: ['email'] }
    ],
    columns: {
        id: {
            type:"mediumint",
            primary: true,
            generated: 'increment',
            unique: true
        },
        userName: {
            type: 'varchar',
            length: 45,
            nullable: false
        },
        email: {
            type: 'varchar',
            length: 80,
            nullable: false,
        },
        passwordHash: {
            type: 'text',
            nullable: true
        },
        lastLogin: {
            type: 'datetime',
            nullable: true
        },
        createdAt: {
            createDate: true,
            nullable: false
        },
        updatedAt: {
            updateDate: true,
            nullable: false
        },
        isActive: {
            type: 'boolean',
            nullable: false,
            default: false,
        },
        avatar: {
            type: 'varchar',
            length: 255,
            nullable: true
        },

    }
})