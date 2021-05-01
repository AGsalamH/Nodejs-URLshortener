require('dotenv').config()

// Dependencies
const http = require('http');
const app = require('./app/app');
const mongoose = require('mongoose');

// Http server
const server = http.createServer(app);


( async ()=>{
    const PORT = process.env.PORT || 5000;
    // Connect to DB
    await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB connected ...');
    // Run Server
    server.listen(PORT, () => {
        console.log(`Server is running on PORT: ${PORT}`);
    });

})()