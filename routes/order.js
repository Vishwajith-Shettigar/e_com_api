const router = require("express").Router();
const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

// create order for user
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (e) {
    res.status(500).json(e);
  }
});

//update order

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updaetOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updaetOrder);
  } catch (e) {
    res.status(500).json(e);
  }
});

// delete  order

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    res.status(500).json("Product has been deleted");
  } catch (e) {
    res.status(500).json(e);
  }
});

// //get user order
router.get("/find/:userid", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userid: req.params.userid });

    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json(e);
  }
});

// //find all orders

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (e) {
    res.status(500).json(e);
  }
});

// get monthy income

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastmonth = new Date(date.setMonth(date.getMonth() - 1));
  const lastlastmonth = new Date(new Date().setMonth(lastmonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: { createdAt: { $gte: lastlastmonth } },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
res.status(200).json(income)

  } catch (e) {
    res.status(500).json(e);
  }
  
});

module.exports = router;
