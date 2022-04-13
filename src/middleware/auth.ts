import { Request, Response, NextFunction } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User_model';

dotenv.config();

export const Auth = {
  private: async(req: Request, res: Response, next: NextFunction) => {
    let SECRET = process.env.JWT_SECRET_KEY as string;
    let success = false;
    // Auth Verified
    if(req.headers.authorization){
      const [authType, token] = req.headers.authorization.split(" ");

      if(authType === "Bearer"){
        //const token = JWT.sign({senha:"123456"}, SECRET);
        //const decode = JWT.decode(token);
        try {
          const verify = JWT.verify(token, SECRET);
          if(verify){
            success = true;
          }
        } catch (error) {
          
        }
        
      }
    }
    if(success){
      next();
    }else{  
      res.status(403);
      res.json({error: 'Is not Authorized'});
    }

  }
}

// export const Auth2 = {
//   private: async(req: Request, res: Response, next: NextFunction) => {
//     let success = false;

//     // Auth Verified
//     if(req.headers.authorization){
//       let hash: string = req.headers.authorization.substring(6);
//       let decoded: string = Buffer.from(hash, 'base64').toString();
//       let data: string[] = decoded.split(':');

//       if(data.length === 2){
//         let newUser = await User.findOne({
//           where:{
//             user_email: data[0],
//             user_password: data[1]
//           }
//         });
//         if(newUser){
//           success = true;
//         }
//       }
//     }

//     if(success){
//       next();
//     }else{  
//       res.status(403);
//       res.json({error: 'Is not Authorized'});
//     }
//   }
// } 