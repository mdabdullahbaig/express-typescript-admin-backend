import express, { Application } from "express";
import config from "./config/dev";
import connect from "./database/connect";

const app: Application = express();

const port = config.port;
const host = config.host;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello India");
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
