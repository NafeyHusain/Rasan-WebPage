const express = require("express");

const { requireSignin, userMiddleWare } = require("../common-middleware");
const { addOrder, getOrders } = require("../controllers/order");

const router = express.Router();

router.post("/addOrder", requireSignin, userMiddleWare, addOrder);
router.get("/getOrders", requireSignin, userMiddleWare, getOrders);

module.exports = router;
