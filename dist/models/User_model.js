"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const mysql_1 = require("../instances/mysql");
exports.User = mysql_1.sequelize.define('User_model', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    role_id: {
        type: sequelize_1.DataTypes.INTEGER
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING
    },
    user_email: {
        type: sequelize_1.DataTypes.STRING
    },
    user_password: {
        type: sequelize_1.DataTypes.STRING
    },
    cell_phone_number: {
        type: sequelize_1.DataTypes.STRING
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING
    },
}, {
    tableName: 'tbl_users',
    timestamps: false
});
