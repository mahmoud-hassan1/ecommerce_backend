import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Color=mongoose.model('Color', colorSchema);
export default Color;