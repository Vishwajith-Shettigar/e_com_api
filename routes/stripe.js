const router=require('express').Router();
const Stripe=require('stripe');
const stripe = Stripe('sk_test_51LmWiySBWVK6YpyS9ch6M1kmus8qq0SHn83LHP2RFZwnmfOTmRUDNriPdEH4HTG0MhHovtGNfmyyttBLW88SejJT00oAMhf8Wg');
// const stripe=require("stripe")(process.env.STRIPE_KEY);

router.post("/payment",async(req,res)=>{
console.log(req.body.tokenId,req.body.amount,process.env.STRIPE_KEY)
  try{
const paymentIntent = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: 'usd',
    payment_method_types: ['card'],
  })
    res.status(200).json(paymentIntent.client_secret)
    
}
catch(e)
{
    console.log(e)
}
// stripe.charges.create({
//         source:req.body.tokenId,
//         amount:req.body.amount,
//         currency:"usd",

//     },(stripeErr,stripeRes)=>{

//         if(stripeErr){
//             console.log(stripeErr)
//             res.status(400).json(stripeErr)
//         }else
//         {
//             res.status(200).json(stripeRes)
//         }
//     })
})

module.exports=router;