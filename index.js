require('dotenv').config()
const bodyParser = require('body-parser');
const cors = require('cors')
const express = require('express');
const fetch = require('node-fetch')
const nodemailer = require('nodemailer');
const { PORT, PASS, RECAPTCHA_SECRET_KEY } = process.env;

const app = express();

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
    auth: {
      user: 'barentbetesting@gmail.com',
      pass: PASS,
    },
  secure: true,
});

transporter.verify(function(error, success) {
  if (error) console.log('MAMA MIA ISSA ERROR ', error)
  else console.log('server ready to receive messages')
})

// send email post route
app.post('/sendemail', async (req, res) => {
  const email = req.body.email;
  const message = req.body.message;
  const token = req.body.token;  
  
  const mailData = {
    from: `${email}`,
    to: 'barentbetesting@gmail.com',
    subject: `Music 4 All - ${message.slice(0, 20)}...`,
    text: `from: ${email}\nmessage : ${message}`,
  };
  
  const captchaVerified = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}`, {
    method: "POST"
  })
  .then(_res => _res.json())
  
  
  if (captchaVerified.success === true) {
    transporter.sendMail(mailData, function (err, info) {
      if (err) res.json({status: 'fail'})
      else return res.json({status: 'success'})
    })
  } else {
    console.log('captcha not verified')
  }
  res.end();
})

app.listen(PORT, () => console.log(`listenin' on port ${PORT}`))

// const human = validateHuman(token);

// if (!human) {
  //   res.status(400);
  //   rest.json('you fool us not, bot')
  //   return
  // }
  
  // async function validateHuman(token) {
    //   const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify/secret=${secret}&response=${token}`)
    //   .then(response => {
      //     console.log(response, 'recaptcha response')
      //     response.json();
      //   })
      //   .catch(err => console.log(err))
      // }
      // const captchaVerified = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LcWA-EZAAAAAEPAUMc-FlViwUce0y1ElFUW3OT0&response=${token}`)
      // .then(response => {
        //   console.log('CAPTCHA POST RESPONSE', response)
        //   return response
        // })
        // .catch(err => console.log('ISSUE WITH POST TO GOOGLE ', err))
        
        // const captchaVerified = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=6LcWA-EZAAAAAEPAUMc-FlViwUce0y1ElFUW3OT0&response=${token}`, {
          // })
          // .then(response => console.log('AXIOS POST RESPONSE ', response))
          