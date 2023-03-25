const EntitySchema = require('typeorm').EntitySchema

module.exports = new EntitySchema({
    name: 'auction',
    columns: {
        id: {
            type: 'mediumint',
            primary: true,
            generated: 'increment',
            unique: true
        },
        title: {
            type: 'varchar',
            length: 600,
            nullable: false
        },
        starTime: {
            type: 'datetime',
            nullable: false
        },
        startPrice: {
            type: 'decimal',
            precision: 14,
            scale: 2,
            nullable: false
        },
        estimatePrice: {
            type: 'decimal',
            precision: 14,
            scale: 2,
            nullable: true
        },
        status: {
            type: 'enum',
            enum: ['CREATED', 'IN_REVIEW', 'SCHEDULED', 'PUBLISHED', 'CANCELLED', 'LIVE', 'PERFORMED'],
            default: 'CREATED',
            nullable: true
        },
        onLive: {
            type: 'boolean',
            default: false,
            nullable: true
        },
        isPublic: {
            type: 'boolean',
            default: false,
            nullable: true
        },
        isListed: {
            type: 'boolean',
            default: false,
            nullable: true
        },
        property_type: {
            type: 'enum',
            enum: ['inmovable', 'movable'],
            nullable: false
        },
        schedulePostTime: {
            type: 'datetime',
            nullable: true
        },
        reason: {
            type: 'varchar',
            length: 255,
            nullable: true
        },
        awardPrice: {
            type: 'decimal',
            precision: 14,
            scale: 2,
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
        //higherBid
        //winnerBid
        auctionResult: {
            type: 'enum',
            enum: ['AWARDED', 'UNAWARDED', 'SUSPENDED'],
            nullable: true
        }

    },
    relations: {
        createdBy: {
            target: 'user',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: {
                foreignKeyConstraintName: 'FK_CREATED_BY_USER_ID_AUCTION'
            }
        },
        type: {
            target: 'auction_type',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: {
                foreignKeyConstraintName: 'FK_AUCTION_TYPE',
            }
        },
        inmovable_property: {
            target: 'inmovable_property',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: {
                foreignKeyConstraintName: 'FK_AUCTION_INMOVABLE_PROPERTY',
            }
        },
        movable_property: {
            target: 'movable_property',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: {
                foreignKeyConstraintName: 'FK_AUCTION_MOVABLE_PROPERTY',
            }
        },
        auctionWinner: {
            target: 'user',
            type: 'many-to-one',
            joinTable: true,
            joinColumn: {
                foreignKeyConstraintName: 'FK_CREATED_BY_USER_ID_AUCTION_WINNER'
            }
        }
    }
})