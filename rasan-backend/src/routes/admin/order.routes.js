const express = require("express");
const { requireSignin, adminMiddleWare } = require("../../common-middleware");
const { updateOrder } = require("../../controllers/admin/order");

const router = express.Router();

router.post(`/order/update`, requireSignin, adminMiddleWare, updateOrder);

module.exports = router;
