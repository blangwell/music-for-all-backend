require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;

// const route = express.Router();
// app.use('/v1', route);

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
    auth: {
      user: 'barentbetesting@gmail.com',
      pass: process.env.PASS,
    },
  secure: true,
});

app.get('/sendemail', (req, res) => {
  res.send('app hit');
})

app.post('/sendemail', (req, res) => {
  const mailData = {
    from: 'barentbetesting@gmail.com',
    to: 'barentbetesting@gmail.com',
    subject: 'SECOND TEST',
    text: 'holy shit',
    html: '<h1> Still workin! </h1>'
  };
  
  transporter.sendMail(mailData, function (err, info) {
    if (err) return console.log(err)
    else return console.log(info)
  })

})



app.listen(port, () => console.log(`listenin' on port ${port}`))
