const cartService=require("../Service/cart.service");
const Address=require("../Models/address.model");
const Order=require("../Models/order.model");
const OrderItem=require("../Models/orderItem.model");

const createOrder = async (user, shipAddress) => {
    try {
        let address;

        if (shipAddress._id) {
            address = await Address.findById(shipAddress._id);
        } else {
            if (!shipAddress.form.firstname || !shipAddress.form.lastname || !shipAddress.form.address || !shipAddress.form.state || !shipAddress.form.pincode || !shipAddress.form.mobile || !shipAddress.form.email) {
                throw new Error("Missing required address fields");
            }

            address = new Address(shipAddress.form);
            address.user = user; // Assuming the user field should be the user ID
            await address.save();
            user.address.push(address);
            await user.save();
        }

        const cart = await cartService.findUserCart(user._id);
        const orderItems = [];
        for (const item of cart.cartItems) {
            const orderItem = new OrderItem({  // Corrected the model name here
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
            });
            const createOrderItem = await orderItem.save();
            orderItems.push(createOrderItem);
        }
        const createOrder = new Order({
            user: user._id,  // Assuming the user field should be the user ID
            orderItems,
            totalPrice: cart.totalPrice,
            totalItem: cart.totalItems,
            shippingAddress: address,  // Corrected the field name here
            orderStatus: "CREATED",
        });
        const saveOrder = await createOrder.save();
        return saveOrder;
    } catch (error) {
        console.error("Error creating order:", error);
        throw error; 
    }
};


const placeOrder=async(orderId)=>{
    const order=await findOrderById(orderId);

    order.orderStatus="PLACED";

    return await order.save();
}

const confirmOrder=async(orderId)=>{
    const order=await findOrderById(orderId);

    order.orderStatus="CONFIRMED";

    return await order.save();
}

const shipOrder=async(orderId)=>{
    const order=await findOrderById(orderId);

    order.orderStatus="SHIPPED";

    return await order.save();
}

const deliveryOrder=async(orderId)=>{
    const order=await findOrderById(orderId);

    order.orderStatus="DELIEVRED";

    return await order.save();
}

const cancelOrder=async(orderId)=>{
    const order=await findOrderById(orderId);

    order.orderStatus="CANCELLED";

    return await order.save();
}

const findOrderById=async(orderId)=>{
    const order=await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems",populate:{path:"product"}})
    .populate("shippingAddress")
    return order;
}

const usersOrderHistory=async(userId)=>{
    try{
        const orders = await Order.find({ user: userId, orderStatus: { $in: ["PLACED", "CANCELLED"] } })
        .populate({path:"orderItems",populate:{path:"product"}}).lean()
        return orders;
    } catch(error){
        throw new Error (error.message)
    }
}

const getAllOrder=async()=>{
    return await Order.find()
    .populate({path:"orderItems",populate:{path:"product"}}).lean()
}

const deleteOrder=async(orderId)=>{
    const order=await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports={
    createOrder,
    placeOrder,
    confirmOrder,
    shipOrder,
    deliveryOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrder,
    deleteOrder,
}