// Dependencies
const express = require('express');
const mongoose  = require('mongoose');
const shortid = require('shortid');

// Models
const ShortUrl = require('./ShortUrlModel');

// Utils
const formatErrors = require('./formatErrors');


// Initialize express app
const app = express();


// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// POST /shorten
app.post('/shorten', async (req, res, next) => {
    const { originalUrl } = req.body;
    try {
        const shortUrl = new ShortUrl({
            originalUrl,
            slug: shortid.generate()
        });
        const savedUrl = await shortUrl.save();
        res.status(201).json({
            ok: 1,
            shortUrl: savedUrl
        })
    } catch (error) {
        console.log(error);
        const formattedErrors = formatErrors(error);
        next(formattedErrors);
    }
});

// GET /:slug
app.get('/:slug', async (req, res, next) => {
    try {
        const shortUrl = await ShortUrl.findOne({slug: req.params.slug});
        if(!shortUrl){
            return res.status(404).json({
                msg: 'No URL matches this slug'
            });
        }
        res.redirect(shortUrl.originalUrl);
    } catch (error) {
        console.log(error);
        const formattedErrors = formatErrors(error);
        next(formattedErrors);
    }
});


// 404 Handler
app.use((req, res, next) =>{
    const error = new Error(`The requested URL: ${req.url} was NOT found on this server!`);
    error.statusCode = 404;
    next(error);
});

// Error Handling Middleware
app.use((error, req, res, next) => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        ok: 0,
        error: error.message || undefined,
        validationErrors: Array.isArray(error) ? error : undefined
    });
});


module.exports = app;