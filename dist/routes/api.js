"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController = __importStar(require("../controllers/apiController"));
//import { Auth } from '../middleware/auth';
const passport_jwt_1 = require("../config/passport_jwt");
const router = (0, express_1.Router)();
// Routers Endpoint Test
router.get('/ping', apiController.ping);
// Routers Endpoint Auth
router.post('/register', apiController.registerUser);
router.post('/login', apiController.loginUser);
// Private User Route
router.post('/users', passport_jwt_1.privateRoute, apiController.createUser);
router.get('/users', passport_jwt_1.privateRoute, apiController.readUser);
router.get('/users/:id', passport_jwt_1.privateRoute, apiController.getUserById);
router.put('/users/:id', passport_jwt_1.privateRoute, apiController.updateUser);
router.delete('/users/:id', passport_jwt_1.privateRoute, apiController.deleteUser);
// Private Movie Route
exports.default = router;
