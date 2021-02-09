const dbConfig = require("../config/config");
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    operatorAliases:false,
    pool:{
        max:dbConfig.pool.max,
        min:dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle:dbConfig.pool.idle
    }
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.film = require('./film.sequelize.js')(sequelize, Sequelize);
db.user = require('./user.sequelize.js')(sequelize, Sequelize);
db.history = require('./history.sequelize')(sequelize,Sequelize);
db.totalHistory = require('./totalHistory.sequelize')(sequelize,Sequelize);
module.exports = db
