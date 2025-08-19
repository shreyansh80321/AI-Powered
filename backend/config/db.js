import mongoose from "mongoose";
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB connected");
  } catch (error) {
    console.log("DB Eror",error.message);
  }
};
export default connectDb;