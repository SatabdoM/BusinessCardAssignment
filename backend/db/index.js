const mongoose=require("mongoose");

//Connect to Mongo DB
mongoose.connect('mongodb+srv://satabdomajumdertech:Satabdo1234567@cluster0.yreueyv.mongodb.net/Cards');
//Define Schemas
const UserSchema=new mongoose.Schema({
    username:String,
    password:String,
    cards:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cards'
    }]
})
const CardsSchema=new mongoose.Schema({
    name:String,
    description:String,
    interests:[String],
    linkedin:String,
    twitter:String
})
const User=mongoose.model('User',UserSchema);
const Cards=mongoose.model('Cards',CardsSchema);
module.exports={
    User,Cards
}
