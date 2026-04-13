import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: true,
            index: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        name: {
            type: String,
            trim: true,
            default: '',
        },
        phone: {
            type: String,
            trim: true,
            default: '',
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
            index: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Customer=mongoose.model('Customer', customerSchema);
export default Customer;