const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')


const authRoutes = require('./routes/auth')
const testRoutes = require('./routes/report')

const app = express();

app.use(cors())

app.use(morgan('dev'));
app.use(bodyParser.json());

//routes 

app.use('/api', authRoutes)
app.use('/api', testRoutes)


const port = process.env.PORT || 8080;


mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(result => {
        app.listen(port);
    })
    .catch(err => console.log(err));

