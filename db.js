import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "norebase"
    });
    console.log("You have successfully connected to your database!");
  } catch (err) {
    console.error(err);
  }
}
