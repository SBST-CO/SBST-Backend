const typeorm = require('typeorm')
const { User } = require('./entities')

const dataSource = new typeorm.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'java',
    database: 'type_orm_sbst_dev',
    entities: [
        User
    ],
    synchronize: true
})

dataSource.initialize().then(() => {

    console.log("Data base is now running 🚀")

}).catch(function(error) {
    console.log("Error: ", error);
});

module.exports = dataSource