const typeorm = require('typeorm')
const { 
    User, 
    MovableProperty, 
    InmovableProperty, 
    PropertyImages, 
    AuctionType, 
    Auction 
} = require('./entities')

const dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User,
        MovableProperty,
        InmovableProperty,
        PropertyImages,
        AuctionType,
        Auction
    ],
    synchronize: true,
    extra: {
        decimalNumbers: true
    },
    logging: false
})

dataSource.initialize().then(async(dataSource) => {
    try {
        await dataSource.query("INSERT INTO auction_type (code, name) VALUES ('SESCP', 'Subasta en sobre cerrado - De primer precio'), ('SESCS', 'Subasta en sobre cerrado - De segundo precio'), ('SD', 'Subasta dinámica'),  ('SRR', 'Subasta Round Robin')")
    } catch {
        console.log('Error adding auction_type values or already exist');
    }
    
    console.log("DB is now running 🚀")

}).catch(function(error) {
    console.log("Error: ", error);
});

module.exports = dataSource