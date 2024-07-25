const Category = require("../Models/category.model");
const Product = require("../Models/product.model");

const createProduct = async (reqData) => {
    let topLevel = await Category.findOne({ name: reqData.topLevelCategory });

    if (!topLevel) {
        topLevel = new Category({
            name: reqData.topLevelCategory,
            level: 1,
        });
        await topLevel.save();
    }

    let secondLevel = await Category.findOne({
        name: reqData.secondLevelCategory,
        parentCategory: topLevel._id,
    });

    if (!secondLevel) {
        secondLevel = new Category({
            name: reqData.secondLevelCategory,
            parentCategory: topLevel._id,
            level: 2,
        });
        await secondLevel.save();
    }

    let thirdLevel = await Category.findOne({
        name: reqData.thirdLevelCategory,
        parentCategory: secondLevel._id,
    });

    if (!thirdLevel) {
        thirdLevel = new Category({
            name: reqData.thirdLevelCategory,
            parentCategory: secondLevel._id,
            level: 3,
        });
        await thirdLevel.save();
    }

    const product = new Product({
        title: reqData.title,
        description: reqData.description,
        price: reqData.price,
        quantity: reqData.quantity,
        color: reqData.color,
        sizes: reqData.sizes,
        imageUrl: reqData.imageUrl,
        // categories: thirdLevel._id,
        categories: topLevel._id,
    });

    return await product.save();
};

const updateProduct = async (productId, reqData) => {
    return await Product.findByIdAndUpdate(productId, reqData);
};

const deleteProduct = async (productId) => {
    await Product.findByIdAndDelete(productId);
    return "Product Deleted Successfully";
};

const findProductById = async (id) => {
    const product = await Product.findById(id).populate("categories").exec();
    if (!product) {
        throw new Error("Product not found with id: " + id);
    }
    return product;
};

const getAllProducts = async ({ page , category, minPrice, maxPrice, sort }) => {
    let query = {};
    if (category && category !== 'all') {
        const existCategory=await Category.findOne({name:category});
        if(existCategory){
         query.categories=existCategory._id;
        }
    }
    if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;
        if (maxPrice) query.price.$lte = maxPrice;
    }

    let sortOption = {};
    if (sort) {
        if (sort === 'low-to-high') {
            sortOption.price = 1;
        } else if (sort === 'high-to-low') {
            sortOption.price = -1;
        }
    }
    const products = await Product.find(query)
        .sort(sortOption)
        .skip((page - 1) * 10)
        .limit(10);
        
    const totalElements = await Product.countDocuments(query);

    return {
        content: products,
        totalElements,
        size: 10,
    };
};



const createMultipleProduct = async (products) => {
    for (let product of products) {
        await createProduct(product);
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProduct,
    findProductById
};
