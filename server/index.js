const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//*************************************************
//        Handlebars template registration
//*************************************************
app.engine('.hbs', exphbs({
    defaultLayout: 'layout',
    extname: '.hbs',
    layoutsDir: path.join(__dirname),
    partialsDir: path.join(__dirname)
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname));

//*************************************************
//           Middleware and other settings
//*************************************************
app.use(express.static(__dirname + '/../public'));

//*************************************************
//           Registrater APP Features
//*************************************************
require('./home').init(app);

var bookRouter = require('./books/bookRoutes')('');
app.use('/api/v1/books', bookRouter);

//*************************************************
//           Midleware
//*************************************************
app.use(function(req, res, next) {
    if (req.url.indexOf('api') == -1) {
        res.render('./home/home');
    } else {
        next();
    }
});

module.exports = app;