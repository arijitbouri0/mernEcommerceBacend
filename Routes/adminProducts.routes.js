const express=require("express");
const router=express.Router();

const productController=require("../Controller/product.controller");
const authenticate=require("../Middleware/authenticate");

router.post("/",authenticate,productController.createProduct);
router.post("/creates",authenticate,productController.createMultipleProducts);
router.delete("/:id",authenticate,productController.deletProduct);
router.put("/:id",authenticate,productController.updateProduct);

module.exports=router;