import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
        },
        slug: {
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

const Category=mongoose.model('Category', categorySchema);
export default Category;