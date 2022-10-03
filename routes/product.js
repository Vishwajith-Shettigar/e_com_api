const router=require('express').Router();
const Product = require('../models/Product');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")


// insert product
router.post("/",verifyTokenAndAdmin,async(req,res)=>{

    const newProduct=new Product(req.body);
  console.log("lol")

    try{
        const savedProduct=await newProduct.save();
        res.status(201).json(savedProduct)

    }catch(e)
    {
        res.status(500).json(e)
    }
})





















// update product

router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{

   

   try{
    const updatedProduct=await Product.findByIdAndUpdate(req.params.id,{

        $set:req.body


    },{new:true})

    res.status(200).json(updatedProduct)
   }
   catch(e)
   {
    res.status(500).json(e);
   }

})



// delete  product

router.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{

    try{
     
          await Product.findByIdAndDelete(req.params.id);

          res.status(500).json("Product has been deleted")

    }
catch(e)
{
    res.status(500).json(e)
}
})


// //find one product (aanyone can)
router.get("/find/:id",async(req,res)=>{


    try{
     
      const product=  await Product.findById(req.params.id);
  
console.log(product)
        res.status(200).json(product)

  }
catch(e)
{
  res.status(500).json(e);
}
})

// //find all product 

router.get("/",async(req,res)=>{

const qCategory=req.query.category;
const qsort=req.query.sort;
const qsize=req.query.size;
console.log("hitting")
console.log(qCategory,qsort,qsize)

if((qCategory==="" || qCategory==="undefined") && (qsort ==="" || qsort==="undefined") && (qsize==="" || qsize==="undefined"))
{
  console.log("free")

  products=await Product.find();
  res.status(200).json(products)
}
else
{
    if(qsize && qCategory && qsort)
    {
      if(qsort==="High"){
      products=await  Product.find({
        categories:{
            $in:[qCategory],
            
           
        },
        size:{
          $in:[qsize]
        }
    }).sort({price:-1});
  }
  else{
    products=await  Product.find({
      categories:{
          $in:[qCategory],
          
         
      },
      size:{
        $in:[qsize]
      }
  }).sort({price:1});
  }
    }
  else if(qsize && qCategory)
{
  
  products=await  Product.find({
    categories:{
        $in:[qCategory],
        
       
    },
    size:{
      $in:[qsize]
    }
});

} 
else if(qsort)
{
  if(qsort==="High")
    products=await Product.find().sort({price:-1});
    else{
      products=await Product.find().sort({price:1});
    }
}

else if(qCategory){
  console.log("cat");
products=await  Product.find({
    categories:{
        $in:[qCategory],
        
       
    },
   
});


}  
else if(qsize)
{
  console.log("size")
  products=await  Product.find({
    
    size:{
      $in:[qsize]
    }
});

}

res.status(200).json(products)

  }



})





module.exports=router