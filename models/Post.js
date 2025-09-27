const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required:[true,'Title is required'],
        trim: true
    },
    body: {
        type: String,
        required:[true,'Body is required'],


    },
    author: {
        type: String,
        default: 'Anonymous'
    },
    tags: {
        type: [String],
        default: []
    },
    likes: {
        type: Number,
        default: 0,
        min: 0
    }
}, {
    timestamps: true
});
postSchema.index({title: 'text', body: 'text'});
module.exports = mongoose.model('Post',postSchema);