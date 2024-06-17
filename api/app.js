const express = require('express');
const morgan = require('morgan');
const colors = require('colors')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes/index.js'); 
const app = express()
const { PORT } = require('./env.js');


//middlewares
app.name = 'API';
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); 
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


//routes
app.use('/', routes); //De esta forma se modularizan las rutas


//listen port
app.listen((PORT || 3001), async () => {
	console.log(`Server listening at ${PORT || 3001}`.bgCyan.white);
});