const FilmModel = require("../models").film;
const Sequelize = require('../models').Sequelize;
const Op        = Sequelize.Op;

module.exports = {

    retrieveAllFilm: async (req,res) => {
        try{
        const title = req.query.title
        const description = req.query.description
        const condition1 = title ? {title : { [Op.like]: `%${title}%`}} : null;
        const condition2 = description ? {description : {[Op.like]: `%${description}%`}} :null;
        let where;
        if(condition1 && condition2){
            where = { title: {[Op.like]: `%${title}%`}, description:{[Op.like]: `%${description}%`}} 
        }else if(condition1){
            where = condition1
        }else if(condition2){
            where = condition2
        }else{
            where = null
        }



        const allFilms = await FilmModel.findAll({where:where});
        res.json(allFilms)
        }catch(error){
            console.log(error)
            res.sendStatus(500)
        }
    },

    retriveFilmById: async (req,res) => {
        const id = parseInt(req.params.id);
        const selectedFilm = await FilmModel.findByPk(id);

        if(!selectedFilm){
            res.status(404).send("Film Not Found")
        }else{
            res.json(selectedFilm)
        }
    },

    createFilm: async (req,res) => {
        const newFilm = {
            title:req.body.title,
            description:req.body.description,
            imageUrl:req.body.imageUrl,
            published:req.body.published
        }
        await FilmModel.create(newFilm)
        res.sendStatus(201)
    },

    updateFilm: async (req,res) => {
        const payload = req.body;

        const id = parseInt(req.params.id);
        await FilmModel.update(payload, {
            where: {id:id}
        });

        res.json({id, ...payload})

    },

    deleteFilm: async (req,res) => {
        const id = parseInt(req.params.id);
        await FilmModel.destroy({where:{id:id}})
        res.sendStatus(204);
    }

}