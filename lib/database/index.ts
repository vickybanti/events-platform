import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let cache = (global as any).mongoose || {conn:null, promise:null};

export const connectToDb = async () => {
    if (cache.conn) return cache.conn

    if (!MONGODB_URI) throw new Error('MONGODB_URI is missing ');

    cache.promise = cache.promise || mongoose.connect(MONGODB_URI,{
        dbName:'evently',
        bufferCommands:false
    })

    cache.conn = await cache.promise

    return cache.conn;
}

