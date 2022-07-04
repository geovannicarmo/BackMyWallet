
import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { db } from "./dbs/mongo.js";
import joi from "joi";


const app= express()

app.use(cors());
app.use(express.json());
dotenv.config();


 export async function signUp(req, res){


const userSchema = joi.object({
  name: joi.string().min(5).max(40).required(),
  password: joi.string().min(6).max(13).required(),
  passwordConfirm: joi.string().min(6).max(13).required(),
  email: joi.string().email().required()
});


const validation = userSchema.validate(req.body);


if (validation.error) {
    console.log(validation.error.details[0].message)
    return res.status(402).send(validation.error.details[0].message)
  }


    const { name, password, passwordConfirm, email} = req.body


    try{
        const emailexistente = await db.collection('users').findOne({
            email
    })

        if(emailexistente){
            return res.status(401).send("Esse e-mail já esta cadastrado")
        }
    }

    catch(error){
        return  res.status(500).send("")
    }


    if(password!==passwordConfirm){
        return res.status(406).send("As senhas não são iguais")
    }

    const passWordCrypt = bcrypt.hashSync(String(password), 10)

    try{
        await db.collection("users").insertOne({
        name, passWordCrypt, email
    })
   
    res.status(201).send("Usuario cadastrado")
    } 
    catch(error){
      return  res.status(500).send()
    }

}

export async function logIn(req,res){

    const userSchema = joi.object({
        password: joi.string().min(6).max(13).required(),
        email: joi.string().email().required()
      });
      
      
      const validation = userSchema.validate(req.body);
      
      
      if (validation.error) {
          console.log(validation.error.details[0].message)
          return res.status(402).send(validation.error.details[0].message)
        }


    const {email, password} = req.body

    const user = await db.collection('users').findOne({
            email
    })

    if(user===null){
        return res.status(401).send("E-mail não cadastrado")
    }

    if(!bcrypt.compareSync(String(password), user.passWordCrypt )){

        return res.status(405).send("Senha incorreta")
    }

    const token = uuid()

    const idUsuario = user._id

    try{
            const userConectd = await db.collection('sessionst').findOne({
                idUsuario
             })

       

       if(userConectd){
           res.set(userConectd.token);
           return res.send({
               token: userConectd.token
           })
       }


        await db.collection("sessionst").insertOne({
            idUsuario, token, lastStatus: Date.now(), name:user.name
        })
        
        console.log(user.name)
        return res.send({token})
    }

  
    catch{
        return res.status(405).send("Falha")
    }
        

}