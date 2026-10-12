import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// Use Google/Cloudflare DNS for MongoDB SRV resolution if local DNS blocks SRV records
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
  if (dns.setDefaultResultOrder) {
    dns.setDefaultResultOrder('ipv4first');
  }
} catch (e) {
  console.log('DNS config warning:', e.message);
}

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log(`Connecting to MongoDB Atlas...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 15000,
      connectTimeoutMS: 15000
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host} / Database: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
