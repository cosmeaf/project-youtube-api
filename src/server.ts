import express, {Request, Response, ErrorRequestHandler} from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import apiRouter from './routes/api';

dotenv.config();

const server = express();

// cors for HTTP Request and Response
server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({extended: true}));

//
server.use('/ping', (req: Request, res: Response) =>{
  res.status(200);
  res.json({success: 'The Ping and Pong'});
});

// passport for Authentication
server.use(passport.initialize());

// Routes
server.use('/api', apiRouter);

// Routes Error 400
const errorHandler: ErrorRequestHandler = (err, req, res, next) =>{
  if(err.status){
    res.status(err.status);
  }else{
    res.status(400);
  }
  if(err.message){
    res.json({error: err.message});
  }else{
    res.json({error: 'Ops! Algo aconteceu de errado...'});
  }  
}
server.use(errorHandler);

// Routes Error 404
server.use((req: Request, res: Response) =>{
  res.status(404);
  res.json({error: 'Endpoint is not Found'});
});



server.listen(process.env.PORT);