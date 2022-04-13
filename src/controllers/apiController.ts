import {Request, Response} from 'express';
import { User } from '../models/User_model';

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
}
// Read All User
export const readUser = async(req: Request, res: Response) =>{
  let data = await User.findAll();
  res.status(200);
  res.json({success: data});
}

// Get User By ID
export const getUserById = async(req:Request, res: Response) =>{
  let { id } = req.params;
  let data = await User.findByPk(id);
  if(data){
    res.status(200);
    res.json({success: data});
  }else{
    res.status(200);
    res.json({error: 'User not Found'});
  }
}

// Update User
export const updateUser = async(req: Request, res:Response) =>{
  let { id } = req.params;
  let {role_id, first_name,last_name,user_email,user_password} = req.body;
  let data = await User.findByPk(id);
  if(data){
    data.first_name = first_name,
    data.last_name = last_name,
    data.user_email = user_email
    data.user_password = user_password
    await data.save();
    res.status(200);
    res.json({success: data});
  }else{
    res.status(200);
    res.json({error: 'User not Found'});
  }
}

// Delete User
export const deleteUser = async(req: Request, res:Response) =>{
  let { id } = req.params;
  let data = await User.findByPk(id);
  if(data){
    await User.destroy({where:{id: id }});
    res.status(200);
    res.json({success: 'User Deleted'});
  }else{
    res.status(200);
    res.json({error: 'User not Found'});
  }
  
}