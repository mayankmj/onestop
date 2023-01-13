   
   
// import { request, response } from 'express';
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Token from '../model/token.js';
dotenv.config();
export const signupUser = async (request , response ) =>{ // resquest comes from frontend like api url api body api header
    // console.log(request.body);
                try {
                    // const user = request.body  //request =>object   body =>key

                    // const newUser = new User(user); // verfication

                    // await newUser.save();  // save the new user records into database

                    // return response.status(200).json({msg : 'Signup successfull'});

                     // const salt = await bcrypt.genSalt();

                     // const hashedPassword = await bcrypt.hash(request.body.password, salt);
                      const hashedPassword = await bcrypt.hash(request.body.password, 10);

                   const user = { username: request.body.username, name: request.body.name, password: hashedPassword }

                 const newUser = new User(user);
                         await newUser.save();

                         return response.status(200).json({ msg: 'Signup successfull' });
                } catch (error) {
                    console.log(error);
                    return response.status(500).json({msg : '1error'});
                }                                     // response goes from backend to frontend according to the request
                                                     
} ;


export const loginUser = async (request , response) => {
    let user = await User.findOne({username: request.body.username});

    if(!user){ // username does not exist
        return response.status(400).json({msg : 'Username does not exist! Please Login'});
    }

    try{ // now checking for password

        let match = await bcrypt.compare(request.body.password , user.password);
        if(match){
            const accessToken = jwt.sign(user.toJSON() , process.env.ACCESS_SECRET_KEY , {expiresIn: '15m'});// temp token expire after some time (generally 15 mins)
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);// generate access token after expiry of access token
        
            const newToken = new Token( {token: refreshToken });      
            await newToken.save();
            
            return response.status(200).json({accessToken: accessToken , refreshToken: refreshToken , name:user.name , username: user.username});
        
        }
        else{
           return  response.status(400).json({msg: 'Wrong Password'});
        }
    }

    catch (error){
        return response.status(500).json({msg: 'error while login'});
    }
}