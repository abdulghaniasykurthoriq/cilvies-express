module.exports = (sequelize,Sequelize) => {
    const TotalHistory = sequelize.define("totalHistory", {
        totalHistory:{
            type:Sequelize.INTEGER
        },
        newHistory:{
            type:Sequelize.INTEGER
        }
    })
    return TotalHistory;
}