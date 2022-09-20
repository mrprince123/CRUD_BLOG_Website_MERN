const mongoose = require('mongoose');


const BlogSchema = new mongoose.Schema({
    BlogName : {
        type : String,
        required : true
    },
    YourName : {
        type : String,
        required : true
    },
    BlogContent : {
        type : String,
        required : true
    }, 
    UploadDate : {
        type : Date,
        required : true,
        default : 20/09/2022
    }
})


const Blog = mongoose.model("Blog", BlogSchema);
module.exports = Blog;