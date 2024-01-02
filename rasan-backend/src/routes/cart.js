const express = require("express");

const { addItemToCart, getCartItems } = require("../controllers/cart");
const { requireSignin, userMiddleWare } = require("../common-middleware");
const router = express.Router();

router.post("/user/cart/addtocart", requireSignin, userMiddleWare, addItemToCart);
router.post("/user/getAllCartItems", requireSignin, userMiddleWare, getCartItems);

module.exports = router;
