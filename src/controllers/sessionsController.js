import jwt from "jsonwebtoken";
import User from "../models/user";
import { checkPassword } from '../services/auth';
import authConfig from '../config/auth'

class SessionController {
    async create(req, res){
        try{
            const { email, password } = req.body;
    
            const user = await User.findOne({ email });
    
            if(!user){
                return res.status(401).json({ error: "User / Password invalid." })
            }
    
            if(!checkPassword(user, password) ){
                return res.status(401).json({error: "User / Password invalid." })
            }
    
            const { id } = user;
    
            return res.json({
                user: {
                    id,
                    email
                },
                token: jwt.sign({ id }, authConfig.secret, {
                    expiresIn: authConfig.expiresIn,
                })
            })
        } catch(err){
            console.error(err);
            return res.status(500).json({ error: "Internal server error. "})
        }
    }
}

export default new SessionController();