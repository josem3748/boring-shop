/// DOTENV
import * as dotenv from "dotenv";
dotenv.config();
const URL = process.env.URL;

import mongoose from "mongoose";

const connectionMongoDb = async () => {
  mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "boring-shop",
  });
};

export { connectionMongoDb };
