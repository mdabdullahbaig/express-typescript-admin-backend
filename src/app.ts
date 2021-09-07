import express, { Application, Request, Response, NextFunction } from "express";
import config from "./config/dev";
import connect from "./database/connect";
import postsRoute from "./routes/posts";

const app: Application = express();

const port = config.port;
const host = config.host;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/posts", postsRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
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
