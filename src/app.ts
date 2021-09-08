import express, { Application, Request, Response, NextFunction } from "express";
import { HttpError } from "./utils/HttpError";
import config from "./config/dev";
import connect from "./database/connect";
import usersRoute from "./routes/users";
import postsRoute from "./routes/posts";

const app: Application = express();

const port = config.port;
const host = config.host;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Middleware (If site is in maintenance mode)
// app.use((req: Request, res: Response, next: NextFunction) => {
//   res
//     .status(503)
//     .send("Site is currently in maintenance mode, Check back soon.");
// });

app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);

// Middleware (If Url is not correct)
app.use((req: Request, res: Response, next: NextFunction) => {
  const error = new HttpError("Something went wrong.", 500);
  return next(error);
});

// Middleware (If some error occured while CRUD operation.)
app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode || 500);
  res.json({ message: err.message || "An unknown error occured!" });
});

connect().then(() => {
  app
    .listen(port, host, function () {
      console.info(`Server running on : http://${host}:${port}`);
    })
    .on("error", (err: any) => {
      if (err.code === "EADDRINUSE") {
        console.log("server startup error: address already in use");
      } else {
        console.error(err);
      }
    });
});
