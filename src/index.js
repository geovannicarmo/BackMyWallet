import chalk from "chalk";
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import authenticationRoutee from "./routes/authenticationRoutee.js";
import routerFinancialMovement from "./routes/financialMovement.routes.js";
import routerstatus from "./routes/authenticationRoutee.js";
import { db } from "./controllers/dbs/mongo.js";


dotenv.config()
const PORT = process.env.PORT;

const app= express()

app.use(cors());
app.use(express.json());

app.use(authenticationRoutee)
app.use(routerFinancialMovement)
app.use(routerstatus)





// export default setInterval(()=>{

//     db.collection("sessionst").deleteMany({
//             lastStatus: {$lt: Date.now()-20000}
//         }).then(()=>{

//             db.collection("sessionst").find().toArray().then((query)=>{
//                 console.log(query)
//             })
//         })
    
// }, 1000)

// app.post('/status', async(req, res)=>{

//     const token = req.headers.authorization?.replace('Bearer ', '')
//     const userConectd = await db.collection('sessionst').findOne({
//         token
//     })
    
//         if(!userConectd){
//             return res.status(400).send("Usuario não logado")
//         }
    
      

//         db.collection("sessionst").updateOne(
//             { token },
//              {$set: {lastStatus: Date.now()}
//             }).then(()=>res.sendStatus(200))
        
//     })



app.listen(PORT, ()=>console.log(chalk.yellow(`Server run in port ${PORT}`)))


