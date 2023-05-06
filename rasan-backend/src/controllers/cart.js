const Cart = require("../models/cart");

exports.addItemToCart = (req, res) => {
    console.log(req.user._id);
    Cart.findOne({ user: req.user._id })
        .then((cart) => {
            if (cart) {
                const product1 = req.body.cartItems.product;
                const item = cart.cartItems.find((c) => c.product == product1);
                let condition, updates;

                if (item) {
                    condition = { user: req.user._id, "cartItems.product": product1 };
                    updates = {
                        $set: {
                            "cartItems.$": {
                                ...req.body.cartItems,
                                quantity: item.quantity + req.body.cartItems.quantity,
                            },
                        },
                    };
                } else {
                    condition = { user: req.user._id };
                    updates = {
                        $push: {
                            cartItems: req.body.cartItems,
                        },
                    };
                }
                Cart.findOneAndUpdate(condition, updates)
                    .then((_cart) => {
                        if (_cart) {
                            return res.status(201).json({ cart: _cart });
                        }
                    })
                    .catch((error) => {
                        return res.status(400).json({ error });
                    });
            } else {
                const cart = new Cart({
                    user: req.user._id,
                    cartItems: [req.body.cartItems],
                });

                cart.save()
                    .then((cart) => {
                        if (cart) {
                            return res.status(200).json({ cart });
                        }
                    })
                    .catch((error) => {
                        return res.status(400).json({ error });
                    });
            }
        })
        .catch((err) => {
            return res.status(400).json({ message: err.toString() });
        });
};
