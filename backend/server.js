require('dotenv').config()

const app = require("./src/app");
const connectDB = require("./src/db/connectDB");

connectDB().then(()=>{
    app.listen(4000, ()=>{
    console.log("server started");
})
})

