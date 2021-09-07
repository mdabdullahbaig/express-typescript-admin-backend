"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dev_1 = __importDefault(require("../config/dev"));
function connect() {
    return mongoose_1.default
        .connect(dev_1.default.dbUri)
        .then(() => {
        console.info("Database connected!!!");
    })
        .catch((error) => {
        console.error("Database Error: ", error);
        process.exit(1);
    });
}
exports.default = connect;
