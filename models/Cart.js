const mongoose=require("mongoose");

const CartSchema= new mongoose.Schema(
    {

        userid:{type:String,required:true,unique:false},
        products:[{
            productid:{
                type:String
            },
            title:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            },
            color:{
                type:String
            },
            size:{
                type:String
            },
            price:{
                type:Number
            },
            img:{
                type:String
            }
        }],
        
        
    },
    {timestamps:true}
)

module.exports=mongoose.model("Cart",CartSchema)