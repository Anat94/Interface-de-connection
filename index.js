let express = require('express');
let app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static('public'));
app.use(express.urlencoded({ extended: false}));
app.use(express.json());


app.get('/', function(req, res) {
    res.render('pages/index.ejs', {messages: "RAS"});
});

app.listen(5000);