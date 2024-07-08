import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "consultease.at.your.service@gmail.com",
      pass: "Iqfv ygnt msfd cnmg",
    },
});

export function Loginmail(email:string,name:string){
    const mailOptions = {
        from: 'consultease.at.your.service@gmail.com',
        to: email,
        subject: 'Welcome to ConsultEASE',
        text: `Hello ${name}` ,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:'+ info.response);
        }
    });
}

export function BookingConfirmation(email:string,patname:string,docname:string,time:string){
    const mailOptions = {
        from: 'consultease.at.your.service@gmail.com',
        to: email,
        subject: 'Appointment Confirmed',
        text: `Hello ${patname},your appointment is confirmed with ${docname}.Time slot:${time}` ,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:'+ info.response);
        }
    });
    
}


export function BookingRejected(email:string,patname:string,docname:string){
    const mailOptions = {
        from: 'consultease.at.your.service@gmail.com',
        to: email,
        subject: 'Appointment Rejected',
        text: `Hello ${patname},your appointment is rejected with ${docname}` ,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:'+ info.response);
        }
    });
}

export function AppointmentRequest(email:string,docname:string){
    const mailOptions = {
        from: 'consultease.at.your.service@gmail.com',
        to: email,
        subject: 'Appointment Request',
        text: `Hello ${docname},you have a new appointment request.Kindly access your dashboard for more details` ,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent:'+ info.response);
        }
    });
}