// const contactForm = document.querySelector('.contact-form');

// let name1 = document.getElementById('user-name');
// let email = document.getElementById('user-email');
// let message = document.getElementById('user-message');

// contactForm.addEventListener('submit', (e) => {
//     e.preventDefault();

//     let formData = {
//         name: name1.value,
//         email: email.value,
//         message: message.value
//     }

//     let xhr = new XMLHttpRequest();
//     xhr.open('POST', '/');
//     xhr.setRequestHeader('content-type', 'application/json');
//     xhr.onload = function() {
//         console.log(xhr.responseText);
//         if(xhr.responseText == 'success') {
//             alert('Email sent');
//             name1.value = '';
//             email.value = '';
//             message.value = '';
//         } else {
//             alert('Something went wrong!')
//         }
//     }

//     xhr.send(JSON.stringify(formData));
// }) 

require('dotenv').config()
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, from, subject, text) => {
 const msg = {
    to, 
    from,
    subject,
    html: text,
 }

 sgMail.send(msg, function(err, result) {
    if (err) {
        console.log('Failed');
    } else {
        console.log('Accomplished');
    }
 });
};

module.exports = sendEmail;