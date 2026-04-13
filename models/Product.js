const mongoose = require('mongoose');

const productVariantSchema = new mongoose.Schema(
    {
        size: {
            type: String,
            trim: true,
            required: true,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        _id: true,
        versionKey: false,
    }
);

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        brand: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        stock: {
            type: Number,
            default: 0,
            min: 0,
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
            index: true,
        },
        color: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Color',
            default: null,
        },
        variants: {
            type: [productVariantSchema],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

productSchema.index({ title: 'text', brand: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);