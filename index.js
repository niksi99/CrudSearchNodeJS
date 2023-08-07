require("dotenv").config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const session = require('express-session');
const methodOverride = require('method-override')
//const flash = require('express-flash-message');

const customerRoute = require('./server/routes/custRoutes');
const connectDB = require("./server/config/DB");

const app = express();
const port = process.env.PORT || 5000

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'))
//DB
connectDB()

//static files
//app.use(express.static('public'));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// Flash Messages
//app.use(flash({sessionKeyName: 'flashMessage' }));

//templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs')

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

app.use('/', customerRoute);

//Handle 404 erroes
app.get('*', (req, res) => {
    res.status(404).render('404');
})
