let express = require('express');
let app = express();
let connection = require('./config.js');


app.set('view engine', 'ejs');

app.use('/assets', express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.get('/', function(req, res) {
    res.render('pages/index.ejs');
});

app.post('/sign_up', function(req, res) {
    res.render('pages/inscription.ejs');
});

app.post('/sign_in', function(req, res) {
    res.render('pages/index.ejs');
});

app.listen(5000);