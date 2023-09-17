import mongoose from "mongoose";

const db = mongoose.connection
mongoose.connect(process.env.DATABASE_URL)

db.on('connected', function () {
  console.log(`Connection to MongoDB ${db.name}`);
})