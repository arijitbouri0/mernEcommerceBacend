const orderService=require("../Service/order.sevice");


const getAllOrder=async(req,res)=>{
    try{
        const orders=await orderService.getAllOrder();
        return res.status(200).send(orders);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const confirmedOrder=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.confirmOrder(orderId);
        return res.status(200).send(orders);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const shipOrder=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.shipOrder(orderId);
        return res.status(200).send(orders);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const deliveryOrder=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.deliveryOrder(orderId);
        return res.status(200).send(orders);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const cancelOrder=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.cancelOrder(orderId);
        return res.status(200).send(orders);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const deleteOrder=async(req,res)=>{
    const orderId=req.params.orderId
    try{
        const orders=await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}


module.exports={
    getAllOrder,
    confirmedOrder,
    shipOrder,
    cancelOrder,
    deleteOrder,
    deliveryOrder,
}