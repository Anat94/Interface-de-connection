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
    res.redirect('/');
});

app.post('/account_inc', function(req, res) {
    let name = req.body.Name;
    let email = req.body.Mail;
    let password = req.body.Password;
    let rpassword = req.body.Rpassword;
    console.log(name, email, password, rpassword);
    if (name != undefined && email != undefined && password != undefined && rpassword != undefined) {
        if (password === rpassword ) {
            connection.query("INSERT INTO Utilisateurs(Nom, email, password) VALUES (?, ?, ?)", [name, email, password], function(error, results, fields) {
                if (error) throw error;
                res.redirect("pages/account.ejs");
            });
        } else {
            err_msg = "Les deux mot de passes ne correspondent pas !";
            res.render('pages/inscription.ejs', { err_msg: err_msg } );
        }
    } else {
        err_msg = "Merci de remplir tous les champs";
        res.render('pages/inscription.ejs', { err_msg: err_msg } );
    }
});

app.post('/account', function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    if (email) {
        if (password) {
            connection.query('SELECT * FROM Utilisateurs WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    res.redirect('pages/account.ejs');
                } else {
                    err_msg = "Mot de passe incorrect";
                    res.render('pages/index.ejs', { err_msg: err_msg } );
                }
            });
        } else {
            err_msg = "Merci de rentrer un mot de passe";
            res.render('pages/index.ejs', { err_msg: err_msg } );
        }
    } else {
        err_msg = "Merci de rentrer un email";
        res.render('pages/index.ejs', { err_msg: err_msg } );
    }
});

app.listen(5000);