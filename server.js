const express = require('express');
const filmRoute = require("./src/route/film");
const userRoute = require("./src/route/user");

const app     = express();


const db = require("./src/models");
db.sequelize.sync({}).then(() => {
    console.log("Drop and re-sync db")
});

app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
})

app.use('/films', filmRoute);
app.use('/users', userRoute);

app.use((req,res) => {
    res.status(404).send("<h1>Page Not Founf</h1>")
})


app.listen(3001, () => {
    console.log('server running in port 3001')
})