const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const users = require('./routes/api/users');
const orders = require('./routes/api/orders');
const vendors = require('./routes/api/vendors');
const app = express();

// connect to MongoDB Atlas Cloud Database
connectDB();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// setting header information
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


app.use(passport.initialize());
require('./config/passport')(passport);


app.use('/api', orders);
app.use('/api/users', users);
app.use('/api/vendors/', vendors);

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 8082;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
