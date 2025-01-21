import mongoose from 'mongoose';

export const connectDB = async () => {
try{
    const conn = await mongoose.connect("mongodb+srv://itssan1027:A3hzV5tMvPTEsqsB@cluster0.xu3ou.mongodb.net/products?retryWrites=true&w=majority&appName=Cluster0" , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
} catch (error){
console.log(`Error: ${error.message}`);
process.exit(1); // process code 1 code means exit with failure, 0 means success
}
};