import mongoose from 'mongoose';


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName:  process.env.NODE_ENV === "development" ? "test" : "Production"
    });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error(err);
  }
}
