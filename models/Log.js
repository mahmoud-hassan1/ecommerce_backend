import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    method: String,
    url: String,
    body: mongoose.Schema.Types.Mixed,
    user: mongoose.Schema.Types.Mixed,
    statusCode: Number,
    createdAt: { type: Date, default: Date.now }
});

const Log = mongoose.model('Log', logSchema);
export default Log;