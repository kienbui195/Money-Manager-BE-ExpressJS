"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const verifyByEmail = (req, res, link) => {
    let transporter = nodemailer_1.default.createTransport({
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
        <h4 style="color: #ee1414; width: 100%; text-align: center; font-size: 20px;">Nhấn vào link dưới đây để xác thực tài khoản của bạn</h4>
        <div style="color: black; font-size: 35px; width: 100%; text-align: center; height: 50px;">${link}</div>
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
        }
        else {
            res.status(200).json({ type: 'success', message: 'Một email đã được gửi đến tài khoản của bạn!' });
        }
    });
};
exports.default = verifyByEmail;
