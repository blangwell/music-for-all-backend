require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
    auth: {
      user: 'barentbetesting@gmail.com',
      pass: process.env.PASS,
    },
  secure: true,
});

transporter.verify(function(error, success) {
  if (error) console.log('MAMA MIA ISSA ERROR ', error)
  else console.log('server ready to receive messages')
})

app.post('/sendemail', (req, res) => {
  console.log(req.body)

  const email = req.body.email;
  const message = req.body.message;

  const mailData = {
    from: `${email}`,
    to: 'barentbetesting@gmail.com',
    subject: `Music 4 All - ${message.slice(0, 20)}...`,
    // text: `text : ${message}`,
    html: `<p>from : ${email}</p> <p>message: ${message}</p>`
  };
  
  transporter.sendMail(mailData, function (err, info) {
    if (err) res.json({status: 'fail'})
    else return res.json({status: 'success'})
  })
})

app.listen(port, () => console.log(`listenin' on port ${port}`))