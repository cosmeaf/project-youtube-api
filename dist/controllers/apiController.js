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
exports.logoutUser = exports.registerUser = exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUserById = exports.readUser = exports.createUser = exports.ping = void 0;
const passport_jwt_1 = require("../config/passport_jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const User_model_1 = require("../models/User_model");
dotenv_1.default.config();
// Test Response
const ping = (req, res) => {
    res.json({ pong: true });
};
exports.ping = ping;
// Create User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { role_id, first_name, last_name, user_email, user_password } = req.body;
    let data = yield User_model_1.User.create({ role_id, first_name, last_name, user_email, user_password });
    res.status(201);
    res.json({ data: data });
    return;
});
exports.createUser = createUser;
// Read All User
const readUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield User_model_1.User.findAll();
    res.status(200);
    res.json({ success: data });
    return;
});
exports.readUser = readUser;
// Get User By ID
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let data = yield User_model_1.User.findByPk(id);
    if (data) {
        res.status(200);
        res.json({ success: data });
        return;
    }
    else {
        res.status(200);
        res.json({ error: 'User not Found' });
        return;
    }
});
exports.getUserById = getUserById;
// Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    let { role_id, first_name, last_name, user_email, user_password } = req.body;
    let data = yield User_model_1.User.findByPk(id);
    if (data) {
        data.role_id = role_id,
            data.first_name = first_name,
            data.last_name = last_name,
            data.user_email = user_email;
        data.user_password = user_password;
        yield data.save();
        res.status(200);
        res.json({ success: data });
        return;
    }
    else {
        res.status(200);
        res.json({ error: 'User not Found' });
        return;
    }
});
exports.updateUser = updateUser;
// Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let data = yield User_model_1.User.findByPk(id);
    if (data) {
        yield User_model_1.User.destroy({ where: { id: id } });
        res.status(200);
        res.json({ success: 'User Deleted' });
        return;
    }
    else {
        res.status(200);
        res.json({ error: 'User not Found' });
        return;
    }
});
exports.deleteUser = deleteUser;
// Login User
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.user_email && req.body.user_password) {
        let email = req.body.user_email;
        let password = req.body.user_password;
        let user = yield User_model_1.User.findOne({
            where: {
                user_email: email,
                user_password: password
            }
        });
        if (user) {
            const token = (0, passport_jwt_1.generatorToken)({
                id: user.id,
                email: user.user_email,
            });
            res.json({ success: true, token });
            return;
        }
    }
    console.log("USER", req.user);
    res.json({ status: false });
});
exports.loginUser = loginUser;
// Register New User from page Register
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.role_id && req.body.first_name && req.body.last_name && req.body.user_email && req.body.user_password) {
        let { role_id, first_name, last_name, user_email, user_password } = req.body;
        let hasUser = yield User_model_1.User.findOne({ where: { user_email: user_email } });
        if (!hasUser) {
            let data = yield User_model_1.User.create({ role_id, first_name, last_name, user_email, user_password });
            const token = (0, passport_jwt_1.generatorToken)({
                id: data.id,
                user_email: data.user_email,
            });
            res.status(201);
            res.json({ success: data.id, token });
            return;
        }
        else {
            res.status(200);
            res.json({ error: 'User allready registred on System' });
            return;
        }
    }
    res.status(200);
    res.json({ error: 'Fields is not be empty' });
});
exports.registerUser = registerUser;
// Logout User
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({ success: 'Logout' });
    return;
});
exports.logoutUser = logoutUser;
