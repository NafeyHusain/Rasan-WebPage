const express = require("express");

const { addItemToCart } = require("../controllers/cart");
const { requireSignin, userMiddleWare } = require("../common-middleware");
const router = express.Router();

router.post("/user/cart/addtocart", requireSignin, userMiddleWare, addItemToCart);

module.exports = router;
