import { Request, Response, NextFunction} from "express";
import jwt from 'jsonwebtoken';
export const SECRET_KEY = '230193';

export const auth = (req:Request, res: Response, next: NextFunction) => {
    let authorization = req.cookies.authorization;
    if (authorization) {
        let accessToken = authorization.split(' ')[1];
        if (!accessToken) {
            res.status(200).json({
                message: 'You are anonymous'
            });
        } else {
            jwt.verify(accessToken, SECRET_KEY, (err: any, data: any) => {
                if (err) {
                    res.status(200).json({
                        error: err.message,
                        message: 'You are anonymous'
                    });
                } else {
                    req.body.decoded = data;
                    console.log(data)
                    next();
                }
            });
        }
    } else {
        res.status(200).json({
            message: 'You are anonymous'
        });
    }
}