require('dotenv').config();
const UserModel = require('../models').user;
const bcrypjs   = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

module.exports = {
    CreateUser: async (req,res) => {
    const {username, email, password} = req.body

    let selectedName = await UserModel.findOne({where:{username:username}})
    if(selectedName){
        return res.status(404).json({
            status:false,
            message:"Username sudah ada"
        })
    }

    let selectedEmail = await UserModel.findOne({where:{email:email}})
    if(selectedEmail){
        return res.status(404).json({
            status:false,
            message:"email sudah ada"
        })
    }
    const hashPassword = await bcrypjs.hash(password,10)

    const newUser = {
        username:username,
        email:email,
        password:hashPassword
    }
    await UserModel.create(newUser)

    return res.status(201).json({
        status:true,
        message:"User berhasil didaftarkan"
    })
    },

    GetUserId: async (req,res) => {
        console.log(req.id)
        const user = await UserModel.findOne({id:req.id})
        return res.status(200).json({
            message:"berhasil di panggil",
            data:user
        })
    },

    LoginUser : async (req,res) => {
        const {username, password} = req.body

        // const userData = await UserModel.findOne({$or: [{username:username}, {email:username}]})
        // const userData = await UserModel.findOne({$or:  [{where:{username:username} {email:username}}  ]} )
        // const userData = await UserModel.findOne({where:{username:username}} || {where:{email:username}} )
        const userData = await UserModel.findOne({where: {username:username}})


        if(userData){

            const passwordUser = await bcrypjs.compare(password, userData.password)
            if(passwordUser){
                const data = {
                    id:userData.id
                };
                const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
                return res.status(200).json({
                    message:"berhasil login",
                    token:token,
                    username:username,
                    id:data.id
                })
            }else{
                return res.status(404).json({
                    status:false,
                    message:"password not match"
                })
            }
        }else{
            return res.status(404).json({
                status:false,
                message:"username not found"
            })
        }
    }
}