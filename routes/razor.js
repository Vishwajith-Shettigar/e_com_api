const router=require('express').Router();
const Razorpay=require('razorpay');
const crypto= require('crypto');


router.post("/payment",async(req,res)=>{

console.log(req.body.amount)
try{

    const instance=new Razorpay({

        key_id:process.env.KEY_ID,
        key_secret:process.env.KEY_SECRET
    })
const options={
    amount:req.body.amount*100,
    currency:"USD",
    receipt:crypto.randomBytes(10).toString("hex")

}
instance.orders.create(options,(error,order)=>{

    if(error)
    {
        console.log(error)
        res.status(500).json(err);

    }
    console.log(order)
    res.status(200).json(order);

})

}catch(error)
{

    console.log(error)
    res.status(500).json(err);
}

})

router.post("/verify",async(req,res)=>{

    try{

        const{razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        const sign=razorpay_order_id +"|"+ razorpay_payment_id;
        const expectedSign=crypto.createHmac("sha256",process.env.KEY_SECRET).update(sign.toString()).digest("hex");

        if(razorpay_signature===expectedSign)
        {
            return res.status(200).json({message:"Payment verified successfully"})

        }else{
return res.status(500).json({message:"Invalid signature"});
        }
    
    }catch(e)
    {
        console.log(e)
        res.status(500).json(e);
    }
})

module.exports=router;