import mongoose from "mongoose";
import bcrypt from "bcryptjs";
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
customerSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, 10);
});
customerSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}
const Customer=mongoose.model('Customer', customerSchema);

export default Customer;