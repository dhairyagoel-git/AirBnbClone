const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const path = require('path');
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync.js');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema } = require('./schema.js'); 

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
    await mongoose.connect(MONGO_URL);
}
main()
    .then((res) => {
        console.log('connected to DB');
    })
    .catch((err) => {
        console.log(err);
    });
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
    res.send('app working');
});
const ValidateListing = (req,res,next)=>{
    // instead of using multiple if statements like this we can use - 
    let {error} = listingSchema.validate(req.body);
    if(error){
        let errMsg      
        throw new ExpressError(400, result.error);
    } else{
        next();
    }
}
//index route
app.get('/listings', async (req, res) => {
    const allListings = await Listing.find({})
    res.render('listings/index.ejs', { allListings })
});
//create route-
app.get('/listings/new', (req, res) => {
    res.render('listings/new.ejs')
});
app.post('/listings',ValidateListing, wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect('/listings');

}));
//show route-
app.get('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/show.ejs', { listing });
}));
// edit route -
app.get('/listings/:id/edit', wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render('listings/edit.ejs', { listing });
}));
//update route-
app.put('/listings/:id', wrapAsync(async (req, res) => {
    if (!req.body.listing) {
        new ExpressError(400, "send valid data");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
}));
//delete route-
app.delete('/listings/:id', wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect('/listings');
}));
app.all('*', (req, res, next) => {
    next(new ExpressError(404, 'Page not found!'));
});
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "something went wrong" } = err;
    res.status(statusCode).render('error.ejs', { err });
});


app.listen('8080', () => {
    console.log(`app is listining on port 8080`);
});