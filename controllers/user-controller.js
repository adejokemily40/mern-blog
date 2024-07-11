import Users from "../models/User.js";
import bcrypt from 'bcryptjs'

export const getAllUser = async (req, res) =>{
    let users;
    try{
        users = await Users.find();
    }catch(err){
        console.log(err)
    }
    if(!users){
        return res.status(404).json({message: "No users found"})
    }
    return res.status(200).json({ users })
}

export const signup = async (req, res) =>{
    const {name, email, password } = req.body

    let existingUser;
    try { 
        existingUser = await Users.findOne({email})
    }catch(err) {
       return console.log(err)
    }
    if(existingUser) {
        return res.status(400).json({message: "User already exits! login instead" })
    
} 
const hashedPassword = bcrypt.hashSync(password)
const user = new Users({ 
        name,
        email,
        password: hashedPassword
      });
    try{
         await user.save()
       res.status(201).json({user});
        
     }catch(err){
        res.status(404).json({ message: err.message});
     
     }
    }

 export const login = async (req, res) => {
    const { email, password } = req.body

    let existingUser;
    try { 
        existingUser = await Users.findOne({email})
    }catch(err) {
       return console.log(err)
    }
    if(!existingUser) {
        return res.status(400).json({message: "could'nt find the user by this email" })
}
const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
if(!isPasswordCorrect) {
    return res.status(404).json({message: "Incorrect password"})
}
return res.status(200).json({message: "Login successfull"})
}