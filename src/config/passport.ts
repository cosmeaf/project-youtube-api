import { Request, Response, NextFunction } from "express";
import passport from "passport";
import { BasicStrategy } from 'passport-http';
import { User } from  '../models/User_model';

const notAuthorizedJson = { status: 401, mesage: 'Not Authorized JSON'};

passport.use(new BasicStrategy(async(user_email, user_password, done) =>{
  if(user_email && user_password){
    const user = await User.findOne({
      where:{
        user_email:user_email,
        user_password:user_password
      }});
      if(user){
        return done(null, user);
      }
  }
  return done(notAuthorizedJson, false);
}));

// Middleware
export const privateRoute = (req: Request, res: Response, next: NextFunction)=>{
  passport.authenticate('basic', (err, user)=>{
    //console.log('MEDDLEWARE', user);
    req.user = user;
    return user ? next() : next(notAuthorizedJson);
  })(req, res, next);
}


export default passport;