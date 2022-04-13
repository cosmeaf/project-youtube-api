"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const passport_1 = __importDefault(require("passport"));
const api_1 = __importDefault(require("./routes/api"));
dotenv_1.default.config();
const server = (0, express_1.default)();
// cors for HTTP Request and Response
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.urlencoded({ extended: true }));
//
server.use('/ping', (req, res) => {
    res.status(200);
    res.json({ success: 'The Ping and Pong' });
});
// passport for Authentication
server.use(passport_1.default.initialize());
// Routes
server.use('/api', api_1.default);
// Routes Error 400
const errorHandler = (err, req, res, next) => {
    if (err.status) {
        res.status(err.status);
    }
    else {
        res.status(400);
    }
    if (err.message) {
        res.json({ error: err.message });
    }
    else {
        res.json({ error: 'Ops! Algo aconteceu de errado...' });
    }
};
server.use(errorHandler);
// Routes Error 404
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint is not Found' });
});
server.listen(process.env.PORT);
