const express = require('express')
const app = express()
require('dotenv').config()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
//Routes import
const userRoutes = require('./routes/userRoutes.js')
const productRoutes = require('./routes/productRoutes.js')
const categoryRoutes = require("./routes/categoryRoutes.js")
//PORT
const PORT = process.env.PORT

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
}))

// img
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//routes
app.use("/user",userRoutes);
app.use('/product',productRoutes);
app.use('/category',categoryRoutes)

app.listen(PORT , (err)=>{
    if(err) throw err;
    console.log(`Server is running on port ${PORT}`)
})