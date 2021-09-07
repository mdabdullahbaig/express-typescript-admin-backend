import mongoose from "mongoose";
import config from "../config/dev";

function connect() {
  return mongoose
    .connect(config.dbUri)
    .then(() => {
      console.info("Database connected!!!");
    })
    .catch((error) => {
      console.error("Database Error: ", error);
      process.exit(1);
    });
}

export default connect;
