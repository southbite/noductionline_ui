var express = require('express'),
settings = require('./settings'),
expressLayouts = require('express-ejs-layouts'),
broker = require('./broker');

var app = express();

app.locals.tag = require('./controllers/helper').tag;

console.log('app.locals.helper');
console.log(app.locals.helper);

app.use(express.bodyParser());
app.use(expressLayouts);
app.use(express.static(__dirname+'/public'));
app.post('/:controller_name/:controller_method', broker.execute_controller);
app.get('/:controller_name/:controller_method', broker.execute_controller);

app.listen(3000);
console.log('Listening on port 3000...');