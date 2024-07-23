const express=require("express");
const router=express.Router();

const productController=require("../Controller/product.controller");
const authenticate=require("../Middleware/authenticate");

// router.get("/",authenticate,productController.getAllProducts);
// router.get("/id/:id",authenticate,productController.findProductById);

router.get("/", productController.getAllProducts);
router.get("/id/:id",productController.findProductById);

module.exports=router;