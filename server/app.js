require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const BlogModel = require('./models/Blog');
const url = process.env.URL;
const cors = require('cors');
const app = express();

console.log(url);
// Installed the cors and use it

app.use(express.json()); // to get the data in json form.
app.use(cors()); // to communicated with apis that we created in backend.

mongoose.connect(url, function () {
    console.log("Database is successfully Connected");
});

app.post('/insert', async function (req, res) {
    const BlogName = req.body.BlogName
    const YourName = req.body.YourName
    const BlogContent = req.body.BlogContent
    const UploadDate = req.body.UploadDate

    const blog = new BlogModel({
        BlogName: BlogName,
        YourName: YourName,
        BlogContent: BlogContent,
        UploadDate: UploadDate
    });

    try {
        await blog.save();
        res.send("Data is inserted");
    } catch (error) {
        res.send("This is error : " + error);
    }
});


app.get('/read', async function (req, res) {
    BlogModel.find({}, function(err, result) {
        if(err){
            res.send("This is the Error : " + err);
        } else {
            res.send(result);
        }
    })
});

app.delete('/delete/:id', async function(req, res) {
    const id = req.params.id;
    res.send(id);

    await BlogModel.findByIdAndRemove(id).exec();
    res.send("Deleted");
});


app.listen(3001, function () {
    console.log("Server is running on the port 3001");
});


// Project Structure
// Blog name - String
// Your name - String
// Your Blog - String,
// Upload Data - Date();
