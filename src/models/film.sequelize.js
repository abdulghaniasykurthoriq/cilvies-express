module.exports = (sequelize, Sequelize) => {
    const Film = sequelize.define("film", {
        title:{
            type:Sequelize.STRING
        },
        description:{
            type:Sequelize.STRING
        },
        imageUrl:{
            type:Sequelize.STRING
        },
        price:{
          type:Sequelize.INTEGER
        },
        category:{
            type:Sequelize.STRING
        },
        published:{
            type:Sequelize.STRING
        }
    });
    return Film;
}
