const express=require("express");
const router=express.Router();

const cartItemController=require("../Controller/cartItem.controller");
const authenticate=require("../Middleware/authenticate");

router.put("/:id",authenticate,cartItemController.updatCartItem);
router.delete("/:id",authenticate,cartItemController.removeCartItem);

module.exports=router;