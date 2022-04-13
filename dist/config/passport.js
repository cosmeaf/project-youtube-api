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
exports.privateRoute = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_http_1 = require("passport-http");
const User_model_1 = require("../models/User_model");
const notAuthorizedJson = { status: 401, mesage: 'Not Authorized JSON' };
passport_1.default.use(new passport_http_1.BasicStrategy((user_email, user_password, done) => __awaiter(void 0, void 0, void 0, function* () {
    if (user_email && user_password) {
        const user = yield User_model_1.User.findOne({
            where: {
                user_email: user_email,
                user_password: user_password
            }
        });
        if (user) {
            return done(null, user);
        }
    }
    return done(notAuthorizedJson, false);
})));
// Middleware
const privateRoute = (req, res, next) => {
    passport_1.default.authenticate('basic', (err, user) => {
        //console.log('MEDDLEWARE', user);
        req.user = user;
        return user ? next() : next(notAuthorizedJson);
    })(req, res, next);
};
exports.privateRoute = privateRoute;
exports.default = passport_1.default;
