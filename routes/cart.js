const router=require('express').Router();
const Cart = require('../models/Cart');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")


// create cart for user
router.post("/",verifyToken,async(req,res)=>{

   console.log(req.body)
    const newCart=new Cart(req.body);


    try{
        
        const savedCart=await newCart.save();
        res.status(201).json(savedCart)

    }catch(e)
    {console.log(e);
        res.status(400).json(e)
    }
})


//update cart

router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{

//    console.log(req.body.products)
if(req.body.products[0].quantity<=0)
{
    await Cart.findByIdAndDelete(req.body._id);

    res.status(201).json("Product has been deleted")
}


    try{
       
     const updateCart=await Cart.findByIdAndUpdate(req.body._id,{
 
         $set:req.body
 
 
     },{new:true})
 console.log(updateCart)
     res.status(200).json(updateCart)
    }
    catch(e)
    {
     res.status(400).json(e);
     console.log(e)
    }
 
 })



















// delete  product

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{

    try{
     
          await Cart.findByIdAndDelete(req.params.id);

          res.status(201).json("Product has been deleted")

    }
catch(e)
{
    res.status(500).json(e)
}
})


// //get user cart
router.get("/find/:id",verifyTokenAndAuthorization, async(req,res)=>{

    try{
     
      const cart=  await Cart.find({userid:req.params.id});
  

        res.status(200).json(cart)

  }
catch(e)
{
  res.status(400).json(e);
}
})

// //find all cart 

router.get("/", verifyTokenAndAdmin,async(req,res)=>{
try{

const cart=await Cart.find();
res.status(200).json(cart)
}
catch(e)
{
    res.status(500).json(e)
;}
})





module.exports=router