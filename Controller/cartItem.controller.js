const cartItemService = require("../Service/cartItem.service");

const updatCartItem = async (req, res) => {
    // console.log('clicked');
    // console.log('req.body',req.body,req.params.id)
    const user = req.user;
    try {
        const updatedCartItems = await cartItemService.updateCartItem(user._id, req.params.id, req.body);
        return res.status(200).send(updatedCartItems);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

const removeCartItem = async (req, res) => {
    // const user =await req.user;
    // console.log('user Id',user._id);
    // console.log("req",req.params.id);
    try {
        const userId = req.user._id.toString();
        await cartItemService.removeCartItem(userId,req.params.id);
        return res.status(200).send({ message: "cart item remove succesfuly" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

module.exports = {
    updatCartItem,
    removeCartItem,
}