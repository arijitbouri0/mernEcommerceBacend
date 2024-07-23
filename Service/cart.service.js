const Cart = require("../Models/cart.model");
const CartItem = require("../Models/cartItem.model");
const Product = require("../Models/product.model");

const createCart = async (userId) => {
    try {
        const cart = new Cart({ user: userId });
        const createdCart = await cart.save();
        return createdCart;
    } catch (error) {
        throw new Error(error.message);
    }
};

const findUserCart = async (userId) => {
    try {
        const cart = await Cart.findOne({ user: userId }).populate('cartItems');

        if (!cart) {
            throw new Error("Cart not found for this user");
        }

        const cartItems = await CartItem.find({ cart: cart._id }).populate("product");

        if (!Array.isArray(cartItems)) {
            throw new Error("Cart items are not in the expected array format");
        }

        cart.cartItems = cartItems;

        // Calculating totalPrice and totalItems
        let totalPrice = 0;
        let totalItems = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalItems += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalItems = totalItems;

        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};




const addCartItem = async (userId, req) => {
    try {
        const cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(req.productId);

        const isPresent = await CartItem.findOne({cart:cart._id,product:product._id,userId})
        // if (!cart) {
        //     cart = await createCart(userId);
        // }
        // // console.log(product);
        // if (!product) {
        //     throw new Error("Product not found");
        // }

        // const cartItem = await CartItem.find({ cart: cart._id }).populate("product");

        if (!isPresent) {
            const cartItem = new CartItem({
                cart: cart._id,
                product: product._id,
                size: req.size,
                quantity: 1,
                price: product.price,
                userId,
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart";
        } else {
            return "Item alreday present in cart";
        }
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = { createCart, findUserCart, addCartItem };