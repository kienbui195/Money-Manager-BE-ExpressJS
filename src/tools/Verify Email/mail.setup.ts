import nodemailer from 'nodemailer';
import { Request, Response } from 'express';


const verifyByEmail = (req: Request, res: Response, id: string) => {

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "tktclothershopc0522i1@gmail.com",
            pass: "kmyumpncamivculs"
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let content = '';
    content += `
    <div style="padding: 10px; background-color: #003375">
    <div style="padding: 10px; background-color: white;">
       
    <h1 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">395 Group| Money Manager Master!</h1>
        <h1 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">Welcome to our application !</h1>

        <div style="color: black; font-size: 35px; width: 100%; text-align: center; height: 50px;">
        <h3 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">Click <a href="https://localhost:3001/register/user/${id}">here</a> to verify your account !</h3>
        </div>
    </div>
    </div>
    `;

    let mainOptions = {
        from: "395 Group",
        to: `${req.body.email}`,
        subject: 'Xác thực tài khoản',
        text: '',
        html: content
    };

    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            res.status(200).json({ type: 'error', message: err });
        } else {
            res.status(200).json({ type: 'success', message: 'Một email đã được gửi đến tài khoản của bạn!' });
        }
    });
};

export default verifyByEmail;