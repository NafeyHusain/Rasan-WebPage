import React, { useEffect, useState } from "react";
import "./style.css";
import Layout from "../../components/Layouts";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { addToCart, getCartItems } from "../../actions/cart.action";
const CartPage = (props) => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);
    // const cartItems = cart.cartItems;

    const dispatch = useDispatch();

    const [cartItems, setCartItems] = useState(cart.cartItems);

    useEffect(() => {
        setCartItems(cart.cartItems);
    }, [cart.cartItems]);

    useEffect(() => {
        if (auth.authenticate) {
            dispatch(getCartItems());
        }
    }, [auth.authenticate]);

    const onQuantityIncrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, 1));
    };
    const onQuantityDecrement = (_id, qty) => {
        const { name, price, img } = cartItems[_id];
        dispatch(addToCart({ _id, name, price, img }, -1));
    };

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <Card headerleft={"My cart"} headerright={"Deliver to"}>
                    {Object.keys(cartItems).map((key, index) => (
                        <CartItem
                            key={index}
                            cartItem={cartItems[key]}
                            onQuantityInc={onQuantityIncrement}
                            onQuantityDec={onQuantityDecrement}
                        />
                    ))}
                </Card>
                <Card
                    headerleft={"Price"}
                    style={{
                        width: "500px",
                    }}
                >
                    Price
                </Card>
            </div>
        </Layout>
    );
};

export default CartPage;
