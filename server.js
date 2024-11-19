const express = require('express')
const app = express()
const router = express.Router()
const axios = require('axios')


const cors = require('cors')

 //"user: Info@mobielebandencentrale.be pass: zdyt xzdw lyqm kvpr,"
app.use(cors({
    origin:'*'
}))
app.use(express.json())

app.post('/' , (req,res) => {



    const {email , phone , ideas , name } = req.body
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for port 465, false for other ports
      auth: {
        user: "beridzegigi19@gmail.com",
        pass: "cdcs xqtm mqsu qktj",
      },
      tls: {
          rejectUnauthorized: false, // Ignore self-signed certificate error
        },

    });
    
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
      // send mail with defined transport object
      const info = await transporter.sendMail({
        from: '"Netseel Website" <maddison53@ethereal.email>', // sender address
        to: `beridzegigi19@gmail.com`, // list of receivers
        subject: "Service ✔", // Subject line
        text: "Hello world?", // plain text body
        html:  `<html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .email-container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: white;
              border-radius: 8px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #555;
              font-size: 16px;
            }
            .button {
              background-color: #4CAF50;
              color: white !important;
              padding: 10px 20px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
              text-decoration: none;
            }
            .Mobile{
             text-decoration:'underline';
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <h1>Welcome to Our Service!</h1>
            <p>Email: ${email},</p>
            <p class="Mobile" >Name: ${name}</p>
            <p class="Mobile" >Mobile No: ${phone}</p>
            <p class="Mobile" >Ideas: ${ideas}</p>

          



          </div>
        </body>
      </html>`, // html body
      });
    
      ("Message sent: %s", console.log(info.messageId) );
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    }
    
    main().catch(console.error);
})
const MAILCHIMP_API_KEY = '135280e62fe390f1a8903e8b53a20dac-us20'; // Replace with your Mailchimp API key
const MAILCHIMP_SERVER_PREFIX = 'us20'; // Replace with the appropriate server prefix
const MAILCHIMP_LIST_ID = '389de4fc01'; // Replace with your Mailchimp list ID

// Endpoint to subscribe a user
app.post('/subscribe', async (req, res) => {
    const email = req.body.email;
    
    if (!email) {
        return res.status(400).json({ error: 'Email address is required' });
    }

    try {
        // Mailchimp API request to add the email to the list
        const response = await axios.post(
            `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
            {
                email_address: email,
                status: 'subscribed', // 'subscribed' status to add the user to the list
            },
            {
                headers: {
                    Authorization: `apikey ${MAILCHIMP_API_KEY}`,
                },
            }
        );

        // Respond to the client
        res.status(200).json({ message: 'Successfully subscribed!' });
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'There was an error subscribing the user.' });
    }
});


app.listen(4000 , console.log("Server Launched"))