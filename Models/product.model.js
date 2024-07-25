const mongoose = require("mongoose");

const sizeSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number,
    },
});

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    color: {
        type: String,
    },
    sizes: sizeSchema,
    imageUrl: {
        type: String,
        required: true,
    },
    categories: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "categories",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("products", productSchema);

module.exports = Product;