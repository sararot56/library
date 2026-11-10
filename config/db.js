import mongoose from 'mongoose';

export const connectDB =async()=>{
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongoDB connected sucssesfuly`);
        
    } catch (error) {
        console.log(`error connecting to mongoDB`,error.message);
        
    }
}