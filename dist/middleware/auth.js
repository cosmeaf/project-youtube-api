"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.Auth = {
    private: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        let SECRET = process.env.JWT_SECRET_KEY;
        let success = false;
        // Auth Verified
        if (req.headers.authorization) {
            const [authType, token] = req.headers.authorization.split(" ");
            if (authType === "Bearer") {
                //const token = JWT.sign({senha:"123456"}, SECRET);
                //const decode = JWT.decode(token);
                try {
                    const verify = jsonwebtoken_1.default.verify(token, SECRET);
                    if (verify) {
                        success = true;
                    }
                }
                catch (error) {
                }
            }
        }
        if (success) {
            next();
        }
        else {
            res.status(403);
            res.json({ error: 'Is not Authorized' });
        }
    })
};
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
