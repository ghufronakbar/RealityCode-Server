require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')
const cors = require('cors');
const { PORT, CLIENT_URL } = require('./constant');
const app = express();


//PARSE APPLICATION JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

// ROUTES
app.get('/', (req, res) =>  res.status(300).redirect(CLIENT_URL));
app.use('/api', require('./routes'));

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server started on port ${PORT} ⚡`);    
});