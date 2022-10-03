const express=require('express');
const app=  express();
const mongoose=require('mongoose')
const dotenv=require('dotenv')

const userRoute=require("./routes/user")
const authRoute=require("./routes/auth")
const productRoute=require("./routes/product")
const cartRoute=require("./routes/cart");
const orderRoute=require("./routes/order")
const cors=require('cors');
dotenv.config();

  app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));
  app.use(cors())
mongoose.connect(
    process.env.MONGO_CONNECTION_URL
)
.then(()=>console.log("Db connected"))
.catch((err)=>console.log(err))



app.use(express.json())

app.use("/api/users",userRoute)
app.use("/api/auth",authRoute)
app.use("/api/products",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/orders",orderRoute)

app.listen(process.env.PORT || 5000,()=>{


    console.log("server is runnibg")
})