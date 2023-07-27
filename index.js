require("dotenv").config();
const express = require('express');

const app = express();
const port = process.env.PORT || 5000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static files
app.use(express.static('public'));

//templating engine
app.set('view engine', 'ejs')

app.listen(port)

app.get('/', (req, res) => {
    res.send('5955');
});