## Form validators - 
Use required if we dosen't want the data to be empty
When we enter data in the form, the browser and/or web server will check to see that data is in the correct format or not and within the constaints.
Writing novalidate in the form tag will disable the default browser feedback toolkit, but still provides access to the form validators APIs in javascript. This will give you leeway to use custom form validators from bootstrap.
Failure and success text - this is the text that is displayed if the entered data is in correct forat and is within the constraints or not . To use this create a new div with class as valid-feedback or invalid-feedback .  THe text within the div will be displayed . Go to new.ejs to see its code.

The above codes will ensure that no invalid text is send to backend when entered through website. But still if we try to use postman or hopscotchh to directly send api request to the server then the invalid data will be send to the server . To avoid this we create server side api's.
***joi - it is the most powerful schema description languge and data validator for JavaScript.***
if(!newListing.description){
        throw new ExpressError(400,'Description is missing');
    }
    if(!newListing.title){
        throw new ExpressError(400,'title is missing');
    }   
    if(!newListing.location){
        throw new ExpressError(400,'location is missing');
    } instead of using multiple if statements like this we use joi   
# Mongo relationships