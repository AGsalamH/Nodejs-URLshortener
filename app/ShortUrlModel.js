const mongoose = require('mongoose');
const { Schema } = mongoose;

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


urlSchema.path('slug').validate(slug => {
    
});



module.exports = mongoose.model('ShortUrl', urlSchema);