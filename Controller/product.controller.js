const productService=require("../Service/product.service")


const createProduct=async(req,res)=>{
    try{
        const product=await productService.createProduct(req.body);
        console.log(product);
        return res.status(201).send(product);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const deletProduct=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await productService.deleteProduct(productId);
        return res.status(201).send(product);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const updateProduct=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await productService.updateProduct(productId,req.body);
        return res.status(201).send(product);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const findProductById=async(req,res)=>{
    const productId=req.params.id;
    console.log(productId);
    try{
        const product=await productService.findProductById(productId);
        return res.status(201).send(product);
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const { page, category, minPrice, maxPrice, sort } = req.query;
        const products = await productService.getAllProducts({ page, category, minPrice, maxPrice, sort });
        return res.status(200).send(products);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


const createMultipleProducts=async(req,res)=>{
    const productId=req.params.id;
    try{
        const product=await productService.createMultipleProduct(req.body);
        return res.status(201).send({message:"Products Created Succesfully"});
    } catch(error){
        return res.status(500).send({error:error.message});
    }
}

module.exports={
    createProduct,
    createMultipleProducts,
    deletProduct,
    updateProduct,
    findProductById,
    getAllProducts
}