const mongoose = require('mongoose');
const { Schema } = mongoose;

const URL_REGEX = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;


const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: [true, 'originalUrl can\'t be empty!'],
    },
    slug: {
        type: String,
        required: [true, 'slug can\'t be empty!']
    }
}, {timestamps: {createdAt: 'created', updatedAt: 'updated'}});


// Validate slug Uniqeness
urlSchema.path('slug').validate(async function (slug) {
   const slugExists = await this.collection.findOne({slug});
   return slugExists ? false : true; 
}, 'slug must be unique, try another one');


// Validate URL format
urlSchema.path('originalUrl').validate(url => url.match(URL_REGEX), 'Invalid URL format');



module.exports = mongoose.model('ShortUrl', urlSchema);