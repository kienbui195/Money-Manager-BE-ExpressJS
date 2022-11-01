import nodemailer from "nodemailer";


let VerifiedEmail = (req: any, res: any, _id: string) => {
    let userId = req.params.id
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "tktclothershopc0522i1@gmail.com",
            pass: "kmyumpncamivculs",
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    let content = '';
    content += `
        <div style="padding: 10px; background-color: #003375">
        <div style="padding: 10px; background-color: white;">
            <h4 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">Mã xác thực của bạn</h4>
            <div style="color: black; font-size: 35px; width: 100%; text-align: center; height: 50px;">http://localhost:3000/${userId}</div>
        </div>
        </div> 
    `;

    let mainOptions = {
        from: '395 Group',
        to: `${req.body.email}`,
        subject: 'Xác thực Tài khoản',
        text: '',
        html: content
    }

    transporter.sendMail(mainOptions, (err, info) => {
        if (err) {
            console.log(err);
            req.flash('message', 'Send Error: ' + err);
            res.status(200).json({messsage : "Error send mail"})
        } else {
            req.flash('message', 'Một email đã được gửi đến tài khoản của bạn!');
            res.status(201).json({messsage : "Mail has been sent to your mail box !"})

        }
    })
};

export default VerifiedEmail;