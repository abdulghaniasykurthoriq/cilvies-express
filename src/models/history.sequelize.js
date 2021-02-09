module.exports = (sequelize, Sequelize) => {
    const History = sequelize.define("history",{
        username:{
            type:Sequelize.STRING
        },
        title:{
            type:Sequelize.STRING
        },
        action:{
            type:Sequelize.STRING
        }
    })
    return History
}