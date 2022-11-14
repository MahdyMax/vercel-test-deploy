const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const sendEmail = require('./public/js/app');

// Deifining Port
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.static('/public'));
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/images', express.static(__dirname + '/public/images'))
app.use(express.json())

// Set views - engine
app.set('views', './views')
app.set('view engine', 'ejs')

// Set views - pages
app.get('/', (req, res) => {
  res.render(__dirname + '/views/index.ejs')
})
app.get('/Suggestion', (req, res) => {
  res.render(__dirname + '/views/Suggestion.ejs')
})
app.get('/Contact', (req, res) => {
  res.render(__dirname + '/views/Contact.ejs')
})
app.get('/suggsend', (req, res) => {
  res.render(__dirname + '/views/suggsend.ejs')
})
app.get('/suppsend', (req, res) => {
  res.render(__dirname + '/views/suppsend.ejs')
})
//

// Send email 

app.post('/sendemail', (req, res) => {
    const { name, email, message } = req.body;

    const from = 'lonnieraven@rrsautomotive.com';
    const to = "suggestions@ravenvending.win";
    const subject = "Suggestion Inquiry";

    const output = `
    <h3>Contact details</h3>
    <ul>
        <h4><strong>Name:  ${name}</h4></strong>
        <h4><strong>Email:  ${email}</h4></strong>
    </ul>
    <h3>Message</h3>
    <ul>
        <h4><strong>${message}</h4></strong>
    </ul>    
    `;

    sendEmail(to, from, subject, output);
    res.redirect('/suggsend')
}); 

app.post('/sendsupport', (req, res) => {
    const { name, email, message } = req.body;

    const from = 'lonnieraven@rrsautomotive.com';
    const to = "support@ravenvending.win";
    const subject = "Contact Inquiry";

    const output = `
    <h3>Contact details</h3>
    <ul>
        <h4><strong>Name:  ${name}</h4></strong>
        <h4><strong>Email:  ${email}</h4></strong>
    </ul>
    <h3>Message</h3>
    <ul>
        <h4><strong>${message}</h4></strong>
    </ul>
    `;

    sendEmail(to, from, subject, output);
    res.redirect('/suppsend')
}); 


// Calling the Port
app.listen(PORT, () => {
    console.log(`Server running port ${PORT}`)
})