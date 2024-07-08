import 'dotenv/config'
import express, {Express, Request, Response} from 'express'
import multer from 'multer'
import fs from 'fs'
import ImageKit from 'imagekit'
import bodyParser from 'body-parser'
import {docRouter} from './routes/doctor'
import {patRouter} from './routes/patient'
import {authRouter} from './routes/auth'
import { createTransport } from 'nodemailer'
import cors from "cors"


const app:Express=express();
const PORT=process.env.PORT || 3000;
const upload=multer({dest: 'uploads/'});

var imagekit = new ImageKit({
    publicKey : "public_qfqEEzTYKX762BWBPVvB399V7x0=",
    privateKey : "private_STZMpuHFFuiE128zIheleYNJoN4=",
    urlEndpoint : "https://ik.imagekit.io/digsm003/"
});

const transporter = createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "consultease.at.your.service@gmail.com",
      pass: "Iqfv ygnt msfd cnmg",
    },
});


app.use(cors());
app.use(bodyParser.json());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/doctor',docRouter);
app.use('/api/v1/patient',patRouter);
app.get('/',(req:Request,res:Response) => {
    res.send('Hello World');
})
app.post('/upload', upload.single('upload'), (req, res) => {
    const file = req.file;
    console.log(file);
    if(!file){
        return res.status(400).send('No file uploaded');
    }
    const filePath = file.path;

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.status(500).send(err);
            return;
        }

        imagekit.upload({
            file: data,
            fileName: file.originalname,
            tags: ["tag1", "tag2"]
        }, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);
            } else {
                if(result){
                    res.status(200)
                    return res.json({message:'File uploaded successfully!',
                                    url:result.url});
                }else{
                    res.status(500)
                    return res.json({message:"Error while uploading file"});
                }
            }
        });
    });
});

app.post('/intromail',(req,res)=>{
    const body=req.body;
    const mailOptions = {
        from: "consultease.at.your.service@gmail.com",
        to: body.email,
        subject: 'Welcome to ConsultEASE',
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Account Created Successfully</title>
                <style>
                    /* Reset CSS */
                    body, html {
                        margin: 0;
                        padding: 0;
                        font-family: Arial, sans-serif;
                        line-height: 1.6;
                        background-color: #f9f9f9;
                    }
                    img {
                        max-width: 100%;
                        height: auto;
                    }
                    /* Container */
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    }
                    /* Logo */
                    .logo {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    /* Message */
                    .message {
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">
                        <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-vector%2Fbird-colorful-logo-gradient-vector_343694-1365.jpg%3Fsize%3D338%26ext%3Djpg%26ga%3DGA1.1.1707466627.1711584000%26semt%3Dais&tbnid=abzwmi7rHHyqsM&vet=12ahUKEwjG68DlvJeFAxVPqGMGHbkfCXQQMygAegQIARBx..i&imgrefurl=https%3A%2F%2Fwww.freepik.com%2Fvectors%2Flogo-design&docid=MBTKclygwadmYM&w=338&h=338&q=logo&ved=2ahUKEwjG68DlvJeFAxVPqGMGHbkfCXQQMygAegQIARBx" alt="Company Logo">
                    </div>
                    <div class="message">
                        <h1>Hello ${body.name}, your account is created successfully on ConsultEASE! </h1>
                        <p>You can now log in using your credentials and can enjoy our seemless online and offline medical appointment booking servies.</p>
                        <p>With ConsultEASE, you can:</p>
                        <ul>
                            <li>Connect with certified doctors in various specialties.</li>
                            <li>Schedule appointments at your convenience.</li>
                            <li>Receive expert medical advice and prescriptions online.</li>
                            <li>Access your medical history securely.</li>
                        </ul>
                        <p>Your well-being is our top priority, and ConsultEASE is here to ensure that you receive the care you deserve, whenever you need it.</p>
                        <p>Thank you for choosing ConsultEASE. We look forward to serving you and providing personalized healthcare solutions tailored to your needs.</p>
                        <p>Welcome aboard!</p>
                        <p>Best regards,<br>The ConsultEASE Team</p>
                    </div>
                </div>
            </body>
            </html>
            ` ,
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email: ", error);
          res.status(500).send("Error sending email");
        } else {
          console.log("Email sent: ", info.response);
          res.status(200).send("Email sent successfully");
        }
    });
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})
