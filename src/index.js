import chalk from "chalk";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import authenticationRoutee from "./routes/authenticationRoutee.js";
import routerFinancialMovement from "./routes/financialMovement.routes.js";

dotenv.config()
const PORT = process.env.PORT;

const app= express()

app.use(cors());
app.use(express.json());

app.use(authenticationRoutee)
app.use(routerFinancialMovement)

app.listen(PORT, ()=>console.log(chalk.yellow(`Server run in port ${PORT}`)))

