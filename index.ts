import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRouter from "./src/routers/auth.route";
import passport from "passport";

dotenv.config();

const port = process.env.PORT || 3001;
const app: Express = express();

app.use(express.static('src/public'));
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);

app.get('/*', (req, res) => {
    res.send(500).json('Server Error')
})

app.listen(port, () => console.log(`Server is running at http://localhost:${port}`))