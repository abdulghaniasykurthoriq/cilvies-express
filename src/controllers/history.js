const HistoryModel = require("../models").history;

module.exports = {

    retrieveAllHistory:async (req,res) => {
        try {
            const allHistorys = await HistoryModel.findAll({
                order:[
                    ['updatedAt','DESC']
                ]
            }
            );
            res.json(allHistorys)
        } catch (error) {
            console.error(error)
        }
    },
    createHistory:async (req,res) => {
        try {
            const newHistory = {
                username:req.body.username,
                title:req.body.title,
                action:req.body.action
            }
            await HistoryModel.create(newHistory)
            res.sendStatus(201)
        } catch (error) {
            console.error(error)
        }
    },



}