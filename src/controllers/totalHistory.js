const TotalHistoryModel = require('../models').totalHistory;


module.exports = {
    retrieveAllHistory: async (req,res) => {
        try {
            
            const total = await TotalHistoryModel.findAll()
            res.json(total)

        } catch (error) {
            console.error(error)
        }
    },
    createTotalHistory: async(req,res) => {
        const newHistory = {
            totalHistory:req.body.totalHistory,
            newHistory:req.body.newHistory
        }
        await TotalHistoryModel.create(newHistory)
        res.sendStatus(201)
    },
    updateAllHistory: async(req,res) => {
        const payload = req.body;
        const id = parseInt(req.params.id)

        await TotalHistoryModel.update(payload,{
            where:{id:id}
        })
        res.json({id, ...payload})
    },
    retrieveById: async (req,res) => {
        const id = parseInt(req.params.id);
        const selectedId = await TotalHistoryModel.findByPk(id);
        if(!selectedId){
            res.status(404).send('not found')
        }else{
            res.json(selectedId)
        }
    }
}