import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from 'cors'
import AuthRoute from './Routes/AuthRoute.js'
import UserRoute from './Routes/UserRoute.js'



const app = express();


// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors())
dotenv.config();


const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//USERrOUTES

app.use('/auth',AuthRoute)
app.use('/user',UserRoute)




