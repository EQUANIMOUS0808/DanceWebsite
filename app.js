const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose")
const port = 8000;
const path = require("path");



// MONGOOSE SCHEMA..........
const contactSchema = new mongoose.Schema({
    Name: String,
    Phone: String,
    Email: String,
    Address: String,
    Desc: String
  });
  const Contact = mongoose.model('Contact', contactSchema);


app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.use('/static',express.static('static'))
app.use(express.urlencoded())

app.get('/',(req,res)=>{
    const params={ }
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={ }
    res.status(200).render('contact.pug',params);
})
app.post('/contact',async(req,res)=>{
    var myData = new Contact(req.body)
    myData.save().then(()=>{
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    });

})

///////starting the server
app.listen(port,()=>{
    console.log(`new website is running on port${port}`);
})


mongoose.connect('mongodb://127.0.0.1:27017/contactDance').then(()=>{
    console.log("connected to MongoDb")
}).catch((error)=>{
    console.log(error)
})


