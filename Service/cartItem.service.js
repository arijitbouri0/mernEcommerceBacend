const userService=require("../Service/user.service");
const CartItem=require("../Models/cartItem.model");
const ProductService=require("../Service/product.service")

const updateCartItem=async(userId,cartItemId,cartItemData)=>{
    // console.log('service',userId,cartItemId,cartItemData);
    try{
        const item=await findCartItemById(cartItemId);

        if(!item){
            throw new Error("cart item not found : ",cartItemId)
        }

        // console.log('item',item);
        const user=await userService.findUserByID(item.userId);

        //console.log('user1',user);

        if(!user){
            throw new Error("user not found :",userId)
        }

        if(user._id.toString()===userId.toString()){
            item.quantity=cartItemData.quantity;
            // console.log(item.quantity);
            // console.log('item.price',item.price);
            // console.log('item.product',item.product);
            const product = await ProductService.findProductById(item.product);
            // console.log(product);
            if (!product) {
                throw new Error("Product not found: " + item.product);
            }
            item.price=item.quantity*product.price;
            // console.log('item.price',item.price);
            const updateCartItem = await item.save();
            // console.log('done');
            return updateCartItem;
        }
        else{
            // console.log('you cant')
            throw new Error("you can't update this cart item ");
        }
    } catch(error){
        throw new Error(error.message);
    }
}

const removeCartItem=async(userId,cartItemId)=>{
    try {
        const cartItem = await findCartItemById(cartItemId);

        if (!cartItem) {
            throw new Error("CartItem not found");
        }

        
        const user = await userService.findUserByID(userId);
        // console.log('user',user);
        if (user._id.toString() !== cartItem.userId.toString()) {
            throw new Error("You cannot remove this cart item");
        }

        await CartItem.findByIdAndDelete(cartItemId);
        return "Item removed from cart";
    } catch (error) {
        throw new Error(error.message);
    }
}

const findCartItemById = async (cartItemId) => {
    try {
        //console.log('Finding cart item with ID:', cartItemId); // Log the cart item ID
        const cartItem = await CartItem.findById(cartItemId);
        if (cartItem) {
            //console.log('Found cart item:', cartItem); // Log the found cart item
            return cartItem;
        } else {
            throw new Error(`CartItem not found with id ${cartItemId}`); // Properly format the error message
        }
    } catch (error) {
        console.error('Error finding cart item:', error.message);
        throw new Error(error.message);
    }
};


module.exports={
    updateCartItem,
    removeCartItem,
    findCartItemById
}