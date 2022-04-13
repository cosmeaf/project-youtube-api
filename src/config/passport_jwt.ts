import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import passport, { use } from "passport";
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import { User } from  '../models/User_model';

dotenv.config();

const notAuthorizedJson = { status: 401, mesage: 'Not Authorized JSON'};

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_KEY as string,
}
passport.use(new JWTStrategy(options, async (payload, done)=>{
  const user = await User.findByPk(payload.id);
  if(user){
    return done(null, user);
  }else{
    return done(notAuthorizedJson, false);
  }
}));

// TOKEN GENERATOR
export const generatorToken = (data: object)=>{
  return jwt.sign(data, process.env.JWT_SECRET_KEY as string);
}
// MIDDLAWARE
export const privateRoute = (req: Request, res: Response, next: NextFunction)=>{
  passport.authenticate('jwt', (err, user)=>{
    req.user = user;
    return user ? next() : next(notAuthorizedJson);
  })(req, res, next);
}


export default passport;