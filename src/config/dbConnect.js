import mongoose from "mongoose";

async function conectaDb() {
  mongoose.connect(process.env.DB_CONNECTION_STRING);

  return mongoose.connection;
}

export default conectaDb;
