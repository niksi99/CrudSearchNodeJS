const mongoose = require('mongoose')

const port = process.env.PORT || 5000
const DB = process.env.DB_URI

const connectDB = async() => {
    await mongoose.connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then((result) => {
        console.log('Mongo connected')
    }).catch((error) => console.log(error))
    
}

module.exports = connectDB