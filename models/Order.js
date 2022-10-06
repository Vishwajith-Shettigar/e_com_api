const mongoose=require("mongoose");

const OrderSchema= new mongoose.Schema(
    {
 
        userid:{type:String},
        cart:[{
        userid:
        
        {type:String,required:true},
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
    }],
        amount:{ type:Number,required:true},
        name:{ type:String,required:true},

        address:{type:Object,required:true},
        phn:{ type:Number,required:true},
        pin:{ type:Number,required:true},
        state:{ type:String,required:true},
        country:{ type:String,required:true},
        status:{type:String,default:"Pending"}
        
        
    },
    {timestamps:true}
)

module.exports=mongoose.model("Order",OrderSchema)