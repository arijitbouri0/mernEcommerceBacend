const express=require("express");
const router=express.Router();

const orderController=require("../Controller/authOrder.controller");
const authenticate=require("../Middleware/authenticate");

router.post("/",authenticate,orderController.createOrder);
router.get("/user",authenticate,orderController.orderHistory);
router.get("/:id",authenticate,orderController.findOrderById);
router.post("/payment",authenticate,orderController.placeOrder)
router.delete("/:orderId",authenticate,orderController.cancelOrder)

module.exports=router;