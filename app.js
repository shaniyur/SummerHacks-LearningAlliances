const express = require('express');
const cookieSession = require('cookie-session');
const passport = require('passport');
const authRouter = require('./routes/authRoutes');
const profileRouter = require('./routes/profileRoutes')
const passportSetup = require('./services/passportSetup')
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const uiRouter = require('./routes/ui');
const apiRouter = require('./routes/api');

app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser());

app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['cookieenckey']
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', uiRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

let gfs;


app.use(express.static('uploads'));
//const email_reg=req.body.email;

//retrieve fikes 
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }
        return res.json(files);
    });
})


const port = process.env.PORT || '3000';
app.listen(port, () => console.log("server started:" + port));

module.exports = app;