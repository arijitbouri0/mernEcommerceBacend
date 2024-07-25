const orderService=require("../Service/order.sevice");

const createOrder=async(req,res)=>{
    const user=req.user;
    // console.log("user1",user,req.body);
    try{
        const createOrder=await orderService.createOrder(user,req.body);
        return res.status(201).send(createOrder);
    } catch(error){
        return res.status(500).send({error:error.message})
    }
}

const findOrderById=async(req,res)=>{
    // console.log(req.params);
    // const user=req.user;
    try{
        const createOrder=await orderService.findOrderById(req.params.id);
        return res.status(201).send(createOrder);
    } catch(error){
        return res.status(500).send({error:error.message})
    }
}

const orderHistory=async(req,res)=>{
    const user=req.user;
    try{
        const createOrder=await orderService.usersOrderHistory(user._id);
        return res.status(201).send(createOrder);
    } catch(error){
        return res.status(500).send({error:error.message})
    }
}

const placeOrder = async (req, res) => {
    const { orderId } = req.body; 
    try {
        const updatedOrder = await orderService.placeOrder(orderId);
        return res.status(200).send(updatedOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const cancelOrder = async (req, res) => {
    const { orderId } = req.params; // Extract orderId from params

    try {
        const updatedOrder = await orderService.cancelOrder(orderId);
        return res.status(200).send(updatedOrder);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


module.exports={
    createOrder,
    findOrderById,
    orderHistory,
    placeOrder,
    cancelOrder,
}