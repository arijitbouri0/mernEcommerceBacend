const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
const { connectToMongoDB } = require("./connection");
const authRouters = require("./Routes/auth.router");
const userRouters = require("./Routes/user.router");


dotenv.config();
const PORT = process.env.PORT || 4000;


connectToMongoDB(process.env.url).then(() =>
  console.log("MongoDb connected")
);


// Middleware for json data
app.use(express.json());

// Middleware for API connect with frontend
app.use(cors());


app.use("/auth", authRouters);
app.use("/api/users", userRouters);

const productRoutes=require("./Routes/customerProduct.routes");
app.use("/api/products",productRoutes);

const adminProductRoutes=require("./Routes/adminProducts.routes");
app.use("/api/admin/products",adminProductRoutes);

const cartRoutes=require("./Routes/cart.router");
app.use("/api/cart",cartRoutes);

const cartItemRoutes=require("./Routes/cartItem.router");
app.use("/api/cart_items",cartItemRoutes);

const orderRoutes=require("./Routes/order.routes");
app.use("/api/orders",orderRoutes);

// const adminOrderRoutes=require("./Routes/adminOrder.routes");
// app.use("/api/admin/orders",adminOrderRoutes);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
