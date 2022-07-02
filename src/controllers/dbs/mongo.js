import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient("mongodb://localhost:27017")
let db;

mongoClient.connect().then(()=>{
    db = mongoClient.db("myMongo")
})



export { db };