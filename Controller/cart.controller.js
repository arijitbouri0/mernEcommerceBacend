const cartService = require("../Service/cart.service");

const findUserCart = async (req, res) => {
    const user = await req.user; // Assuming req.user contains authenticated user data
    try {
        const cart = await cartService.findUserCart(user._id);
        return res.status(200).send(cart);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const addItemToCart = async (req, res) => {
    const user = await req.user // Assuming req.user contains authenticated user data
    try {
        const cartItem = await cartService.addCartItem(user._id, req.body);
        // console.log("cartItem",cartItem);
        return res.status(200).send(cartItem);
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    findUserCart,
    addItemToCart
};
