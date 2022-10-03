const mongoose=require("mongoose");

const OrderSchema= new mongoose.Schema(
    {

        userid:{type:String,required:true},
        products:[{
            productid:{
                type:String
            },
            quantity:{
                type:Number,
                default:1,
            },
        }],

        amount:{ type:Number,required:true},
        address:{type:Object,required:true},
        status:{type:String,default:"Pending"}
        
        
    },
    {timestamps:true}
)

module.exports=mongoose.model("Order",OrderSchema)