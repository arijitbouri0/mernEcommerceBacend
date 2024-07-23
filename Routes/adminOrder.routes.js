const express=require("express");
const router=express.Router();

const orderController=require("../Controller/adminOrder.controller");
const authenticate=require("../Middleware/authenticate");

router.get("/",authenticate,orderController.getAllOrder);

router.get("/:orderId/confirmed",authenticate,orderController.confirmedOrder);
router.get("/:orderId/ship",authenticate,orderController.shipOrder);
router.get("/:orderId/cancel",authenticate,orderController.cancelOrder);
router.get("/:orderId/delete",authenticate,orderController.deleteOrder);
router.get("/:orderId/delivery",authenticate,orderController.deliveryOrder);

module.exports= router;