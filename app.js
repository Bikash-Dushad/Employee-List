require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 4001;
require('./config/mongoose');
const expresssession = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const custumMiddleware = require('./config/middlewarre')

app.use(express.urlencoded({extended: true}));
app.use(cookieParser())


app.use(express.static(__dirname + '/assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expresssession({
    secret: 'xyz', // 
    
    resave: false,
    saveUninitialized: false
  }));

app.use(flash())
app.use(custumMiddleware.setFlash);

app.use('/', require('./routes'))

app.listen(PORT, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})