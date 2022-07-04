
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import { db } from "./dbs/mongo.js";
import joi from "joi";
import dayjs from "dayjs";



const app= express()

app.use(cors());
app.use(express.json());
dotenv.config();


export async function postFinancialMovement(req,res){

    const tdbody = req.body
   const idUsuario = res.locals.idUsuario

   const userSchema = joi.object({
    type: joi.string().valid("entrada","saida","saída").required(),
    valor: joi.number().required(),
    description: joi.string().min(6).max(160).required(),
  });
  
  
  const validation = userSchema.validate(req.body);


  let day= (dayjs().format('DD/MM'))
  
  tdbody.day=day
  
  console.log(tdbody)
  
  if (validation.error) {
      console.log(validation.error.details[0].message)
      return res.status(402).send(validation.error.details[0].message)
    }


    await db.collection("financialMovement").insertOne({
        idUsuario, tdbody
    })
    res.send("cadastrado com sucesso")
}


export async function getFinancialMovement(req,res){

   const idUsuario = res.locals.idUsuario

  let datesuser =  await db.collection("financialMovement").find({idUsuario}).toArray()

  let datesuserbody =  datesuser.map(moviment=>moviment.tdbody)
  res.status(201).send(datesuserbody)
}