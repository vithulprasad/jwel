import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`mongodb connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error in connection db ${error.message}`);
    process.exit(1)
  }
};
export default connectDb