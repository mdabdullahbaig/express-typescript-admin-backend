"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dev_1 = __importDefault(require("./config/dev"));
const connect_1 = __importDefault(require("./database/connect"));
const app = (0, express_1.default)();
const port = dev_1.default.port;
const host = dev_1.default.host;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, connect_1.default)().then(() => {
    app
        .listen(port, host, function () {
        console.info(`Server running on : http://${host}:${port}`);
    })
        .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.log("server startup error: address already in use");
        }
        else {
            console.error(err);
        }
    });
});
