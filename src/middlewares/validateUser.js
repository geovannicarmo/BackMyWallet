import { db } from "../controllers/dbs/mongo.js";

async function validateUser(req, res, next) {

const token = req.headers.authorization?.replace('Bearer ', '')
const userConectd = await db.collection('sessionst').findOne({
    token
})

    if(!userConectd){
        return res.status(400).send("Usuario não logado")
    }

    res.locals.idUsuario = userConectd.idUsuario;
    next();
}

export default validateUser
