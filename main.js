const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

// For ( sendgrid )
// const path = require('path');
const sendEmail = require('./public/js/app');
//

const PORT = process.env.PORT || 5000;


// For ( sendgrid )
app.use(express.urlencoded({ extended: false}));
//

// Middleware
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/images', express.static(__dirname + 'public/images'))
app.use(express.json())

//

// Set views - engine
app.set('views', './views')
app.set('view engine', 'ejs')

// Set views - pages
app.get('', (req, res) => {
  res.render('index')
})
app.get('/Suggestion', (req, res) => {
  res.render('Suggestion')
})
app.get('/Contact', (req, res) => {
  res.render('Contact')
})


app.get('/sent', (req, res) => {
  res.render('sent')
})
//



// Send email 
// app.post('/', (req, res) => {
//     console.log(req.body);
    
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth:  {
//             user: 'maxvegra@gmail.com',
//             pass: 'pyasxnawqnlhqqya'
//         }
//     })
    
//     const mailOptions = {
//     from: "New Report",
//     to: 'mahdyupwork@gmail.com',
//     subject: `New Contact Enguiry`,
//     html: `Name: ${req.body.name} <br> 
//     Email: ${req.body.email} <br> 
//     Message: ${req.body.message}`
// }

// transporter.sendMail(mailOptions, (error, info) => {
//     if(error) {
//         console.log(error);
//         res.send('error');
//     }else {
//         console.log('Email sent: ' + info.response);
//         res.send('success')
//     }
// })
// })
//

// Send email #2

app.post('/sendemail', (req, res) => {
    const { name, email, message } = req.body;

    const from = 'MahdyUpwork@gmail.com';
    const to = "maxvegra@gmail.com";
    const subject = "New Contact Request";

    const output = `
    <h3>You have new contact request</h3>
    <h3>Contact details</h3>
    <ul>
        <li>Name: ${name}</li>
        <li>email: ${email}</li>
        <li>message: ${message}</li>
    </ul>
    `;

    sendEmail(to, from, subject, output);
    res.send('sent')
    // res.render('/sent')
}); 

app.post('/sendsupport', (req, res) => {
    const { name, email, message } = req.body;

    const from = 'Mahdyupwork@gmail.com';
    const to = " suggestions@ravenvending.win";
    const subject = "New Contact Request";

    const output = `
    <h3>You have new contact request</h3>
    <h3>Contact details</h3>
    <ul>
        <li>Name: ${name}</li>
        <li>email: ${email}</li>
        <li>message: ${message}</li>
    </ul>
    `;

    sendEmail(to, from, subject, output);
    res.send('sent')
    // res.redirect('/sent')
}); 



app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`)
})