require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors')

const app = express();

app.use(cors());
app.use(bodyParser.json());

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
  console.log(req.body)

  const email = req.body.email;
  const message = req.body.message;

  const mailData = {
    from: email,
    to: 'barentbetesting@gmail.com',
    subject: 'Giving it another shot',
    text: `text : ${message}`,
    html: `<p>heres the message : ${message}</p>`
  };
  
  transporter.sendMail(mailData, function (err, info) {
    if (err) res.send(err)
    else return console.log(info)
  })
})



app.listen(port, () => console.log(`listenin' on port ${port}`))
