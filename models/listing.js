let mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title:{
        type:String,
        required:true, 
    },
    description:String,
    image :{ 
        type:String,    
        default:'C:\Users\HP-PC\Downloads\beachhouse.jpg',
        set:(v)=> v === ''? 'C:\Users\HP-PC\Downloads\beachhouse.jpg' : v,
        },
    price: Number,
    location: String,
    country: String,
});
const Listing = mongoose.model('Listing',listingSchema);
module.exports = Listing;