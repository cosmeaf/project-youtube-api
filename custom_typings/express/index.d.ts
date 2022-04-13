declare module "express-session" {
  interface Session {
    user: string;
  }
}
declare namespace Express {
  export interface Request {
      user: any;
  }
  export interface Response {
      user: any;
  }
}