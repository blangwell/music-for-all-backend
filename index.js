require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();
const port = process.env.PORT || 3000;

app.use('/v1', route);
app.listen(port, () => console.log(`listenin' on port ${port}`))