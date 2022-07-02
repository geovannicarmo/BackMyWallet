import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI= process.env.MONGO_URI

const mongoClient = new MongoClient(MONGO_URI)
let db;

mongoClient.connect().then(()=>{
    db = mongoClient.db("myMongo")
})

export { db };