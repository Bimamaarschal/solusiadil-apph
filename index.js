const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const registerRoutes = require('./routes/registerRoutes');
const loginRoutes = require('./routes/loginRoutes');
const routeRoutes = require('./routes/routeRoutes');
const path = require('path'); 

const app = express();


app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'notsosecret', 
    resave: true,
    saveUninitialized: true
  }));

app.use('/', registerRoutes);
app.use('/', loginRoutes);
app.use('/', routeRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    
});


