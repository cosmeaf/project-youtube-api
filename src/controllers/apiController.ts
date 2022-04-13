import {Request, Response} from 'express';
import JWT from 'jsonwebtoken';
import { generatorToken } from '../config/passport_jwt';
import dotenv from 'dotenv';
import { User } from '../models/User_model';

dotenv.config();

// Test Response
export const ping = (req: Request, res: Response) =>{
  res.json({pong: true});
}

// Create User
export const createUser = async (req: Request, res: Response) =>{
  let {role_id, first_name, last_name, user_email, user_password} = req.body;
  let data = await User.create({role_id, first_name, last_name, user_email, user_password});
  res.status(201);
  res.json({data: data});
  return;
}
// Read All User
export const readUser = async(req: Request, res: Response) =>{
  let data = await User.findAll();
  res.status(200);
  res.json({success: data});
  return;
}

// Get User By ID
export const getUserById = async(req:Request, res: Response) =>{
  let id: string = req.params.id;
  let data = await User.findByPk(id);
  if(data){
    res.status(200);
    res.json({success: data});
    return;
  }else{
    res.status(200);
    res.json({error: 'User not Found'});
    return;
  }
}

// Update User
export const updateUser = async(req: Request, res:Response) =>{
  const id: string = req.params.id;
  let {role_id, first_name,last_name,user_email,user_password} = req.body;
  let data = await User.findByPk(id);
  if(data){
    data.role_id = role_id,
    data.first_name = first_name,
    data.last_name = last_name,
    data.user_email = user_email
    data.user_password = user_password
    await data.save();
    res.status(200);
    res.json({success: data});
    return;
  }else{
    res.status(200);
    res.json({error: 'User not Found'});
    return;
  }
}

// Delete User
export const deleteUser = async(req: Request, res:Response) =>{
  let id: string = req.params.id;
  let data = await User.findByPk(id);
  if(data){
    await User.destroy({where:{id: id }});
    res.status(200);
    res.json({success: 'User Deleted'});
    return;
  }else{
    res.status(200);
    res.json({error: 'User not Found'});
    return;
  }
  
}

// Login User
export const loginUser = async (req: Request, res: Response) => {
  if(req.body.user_email && req.body.user_password){
    let email: string = req.body.user_email;
    let password: string = req.body.user_password;

    let user = await User.findOne({
      where:{
        user_email:email,
        user_password:password
      }
    });
    if(user){
      const token = generatorToken(
        {
          id: user.id,
          email: user.user_email,
        }
      );
      res.json({success: true, token});
      return;
    }
  }
  console.log("USER", req.user);
  res.json({status: false});
}

// Register New User from page Register
export const registerUser = async (req: Request, res: Response) =>{
  if(req.body.role_id && req.body.first_name && req.body.last_name && req.body.user_email && req.body.user_password){
    let {role_id, first_name, last_name, user_email, user_password} = req.body;
    let hasUser = await User.findOne({where:{user_email:user_email}});

    if(!hasUser){
      let data = await User.create({role_id, first_name, last_name, user_email, user_password});
      const token = generatorToken(
        {
          id: data.id,
          user_email: data.user_email,
        }
      );
      res.status(201);
      res.json({success: data.id, token });
      return;
    }else{
      res.status(200);
      res.json({error: 'User allready registred on System'});
      return;
    }
  }
    res.status(200);
    res.json({error: 'Fields is not be empty'});
}
// Logout User
export const logoutUser = async(req: Request, res: Response) =>{
    res.json({success: 'Logout'});
    return;
}