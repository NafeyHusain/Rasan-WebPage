import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions";
import { Link } from "react-router-dom";
import Card from "../../components/UI/Card";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import Layout from "../../components/Layouts";

import "./style.css";
import { Breed } from "../../components/MaterialUI";
import { generatePublicUrl } from "../../urlConfig";

const OrderPage = (props) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    useEffect(() => {
        dispatch(getOrders());
    }, []);
    return (
        <Layout>
            <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
                <Breed>
                    breed=
                    {[
                        { name: "Home", href: "/" },
                        { name: "My account", href: "/account" },
                        { name: "My Orders", href: "/account/orders" },
                    ]}
                    breedIcon={<IoIosArrowForward />}
                </Breed>
            </div>
            {user.orders.map((order) => {
                return order.items.map((item) => (
                    <Card style={{ margin: "5px 0" }}>
                        <Link to={`/order_details/${order._id}`} className="orderItemContainer">
                            <div className="orderImgContainer">
                                <img
                                    alt=""
                                    className="orderImg"
                                    src={generatePublicUrl(item.productId.productPictures[0].img)}
                                />
                            </div>
                            <div className="orderRow">
                                <div className="orderName">{item.productId.name}</div>
                                <div className="orderPrice">
                                    <BiRupee />
                                    {item.payablePrice}
                                </div>
                                <div>{order.paymentStatus}</div>
                            </div>
                        </Link>
                    </Card>
                ));
            })}
        </Layout>
    );
};

export default OrderPage;
