const typeorm = require('typeorm')
const { User, MovableProperty, InmovableProperty, PropertyImages } = require('./entities')

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
        PropertyImages
    ],
    synchronize: true,
    extra: {
        decimalNumbers: true
    },
    logging: false
})

dataSource.initialize().then(async(d) => {
    //const mpRepository = d.getRepository('movable_property')
    console.log("DB is now running 🚀")

}).catch(function(error) {
    console.log("Error: ", error);
});

module.exports = dataSource