import mongoose from 'mongoose';

export const connectDB = async () => {
    try{
        console.log();
    await mongoose.connect(process.env.MONGO_URI,{
        // serverSelectionTimeoutMS:1000,
    });
    console.log('Connected to MongoDB');
    }
    catch(err){
        console.log("Error connecting to MongoDB", err);
    }
}
