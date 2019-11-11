const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const app = express();
const routes = require('./routes/routes');
app.set('views', './views');
app.set('view egnine', 'ejs');

app.use(morgan('dev'));
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false}));

app.use('/', routes);

app.listen(80, () => {
     console.log("instaHot web deployed => 80")
})