import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        productTitle: {
            type: String,
            required: true,
            trim: true,
        },
        productBrand: {
            type: String,
            default: '',
            trim: true,
        },
        selectedSize: {
            type: String,
            default: '',
            trim: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 1,
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        lineTotal: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            default: 'PENDING',
        },
    },
    {
        _id: true,
        versionKey: false,
    }
);

const orderSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
            index: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: (value) => Array.isArray(value) && value.length > 0,
                message: 'Order must contain at least one item',
            },
        },
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        paymentMethod: {
            type: String,
            enum: ['CASH', 'CARD', 'ONLINE'],
            default: 'CASH',
        },
        status: {
            type: String,
            enum: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'],
            default: 'PENDING',
            index: true,
        },
        shippingAddress: {
            type: String,
            required: true,
            trim: true,
        },
        customerName: {
            type: String,
            default: '',
            trim: true,
        },
        customerEmail: {
            type: String,
            default: '',
            trim: true,
        },
        customerPhone: {
            type: String,
            default: '',
            trim: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

orderSchema.index({ customer: 1, createdAt: -1 });
orderSchema.index({ status: 1, createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);