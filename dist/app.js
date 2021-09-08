"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HttpError_1 = require("./utils/HttpError");
const dev_1 = __importDefault(require("./config/dev"));
const connect_1 = __importDefault(require("./database/connect"));
const users_1 = __importDefault(require("./routes/users"));
const posts_1 = __importDefault(require("./routes/posts"));
const posts_2 = __importDefault(require("./routes/posts"));
const app = (0, express_1.default)();
const port = dev_1.default.port;
const host = dev_1.default.host;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Middleware (If site is in maintenance mode)
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res
//     .status(503)
//     .send("Site is currently in maintenance mode, Check back soon.");
// });
app.use("/api/users", users_1.default);
app.use("/api/posts", posts_1.default);
app.use("/api/comments", posts_2.default);
// Middleware (If Url is not correct)
app.use((req, res, next) => {
    const error = new HttpError_1.HttpError("Something went wrong.", 500);
    return next(error);
});
// Middleware (If some error occured while CRUD operation.)
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(err.statusCode || 500);
    res.json({ message: err.message || "An unknown error occured!" });
});
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
