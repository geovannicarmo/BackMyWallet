import chalk from "chalk";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import authenticationRoutee from "./src/routes/authenticationRoutee.js";
import routerFinancialMovement from "./src/routes/financialMovement.routes.js";

dotenv.config();

const app= express()

app.use(cors());
app.use(express.json());

app.use(authenticationRoutee)
app.use(routerFinancialMovement)

app.listen(5000, ()=>console.log(chalk.yellow(`Server run in port 5000`)))