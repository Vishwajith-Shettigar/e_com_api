const router=require('express').Router();
const User = require('../models/User');
const {verifyToken,verifyTokenAndAuthorization, verifyTokenAndAdmin}=require("./verifyToken")

// update username

router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{

   if(req.body.password){

    req.body.password=CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();


   }

   try{
    const updateduser=await User.findByIdAndUpdate(req.params.id,{

        $set:req.body


    },{new:true})

    res.status(200).json(updateduser)
   }
   catch(e)
   {
    res.status(500).json(e);
   }

})



// delete  user

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{

    try{
     
          await User.findByIdAndDelete(req.params.id);

          res.status(500).json("User has been deleted")

    }
catch(e)
{
    res.status(500).json(e)
}
})


//find one user (admin opetration)
router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{

    try{
     
      const user=  await User.findById(req.params.id);
     const { password,...others}=user._doc;

        res.status(500).json(others)

  }
catch(e)
{
  res.status(500).json(e);
}
})

//find all user (admin opetration)

router.get("/",verifyToken,async(req,res)=>{
console.log(req.query.id)
    try{
     
        const user=  await User.findById(req.query.id);
    //  const { password,...others}=user._doc;
console.log(user)
        res.status(500).json(user)

  }
catch(e)
{
  res.status(500).json(e);
}
})


// get user stats

router.get("/stats",verifyTokenAndAdmin,async(req,res)=>{

    const date= new Date();
    const lastyear=new Date(date.setFullYear(date.getFullYear()-1));

    try{

            const data=await User.aggregate([

                {
$match:{createdAt:{$gte:lastyear}}

                },
                {
                    $project:{

                        month:{$month:"$createdAt"}
                    },
                },
                {
                    $group:{
                        _id:"$month",
                        total:{$sum:1}
                    }
                }


            ])
            res.status(200).json(data);
    }

catch(e)
{
    res.status(500).json(e);
}
})



module.exports=router