import express, {Request, Response } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

dotenv.config();

const server = express();

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

// Routes
server.use(apiRouter);

// Routes Error 404
server.use((req: Request, res: Response) =>{
  res.status(404);
  res.json({error: 'Endpoint is not Found'});
});

server.listen(process.env.PORT);