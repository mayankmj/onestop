import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
        // Unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: String,
        required: true
    },
    createddate:{
        type: Date,
        // required: true
    }
})

const post = mongoose.model('post',postSchema);

export default post;