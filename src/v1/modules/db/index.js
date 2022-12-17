const typeorm = require('typeorm')
const { User } = require('./entities')

const dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        User
    ],
    synchronize: true
})

dataSource.initialize().then(() => {

    console.log("DB is now running 🚀")

}).catch(function(error) {
    console.log("Error: ", error);
});

module.exports = dataSource