require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();
const port = process.env.PORT || 3000;

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
    auth: {
      user: 'barentbetesting@gmail.com',
      pass: process.env.PASS,
    },
  secure: true,
});

route.post('/sendemail', (req, res) => {
  const mailData = {
    from: 'barentbetesting@gmail.com',
    to: 'barentbetesting@gmail.com',
    subject: 'NODEMAILER TEST',
    text: 'holy shit',
    html: '<h1> Holy shit! </h1>'
  };
  
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) console.log(err)
    else console.log(info)
  })

})


app.use('/v1', route);

app.listen(port, () => console.log(`listenin' on port ${port}`))
