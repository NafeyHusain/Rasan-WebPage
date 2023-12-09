import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems } from "../../actions";
import { Anchor, MaterialButton, MaterialInput } from "../../components/MaterialUI";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";

import "./style.css";
import Layout from "../../components/Layouts";
import AddressForm from "./AddressForm";

const CheckoutStep = (props) => {
    return (
        <div className="checkoutStep">
            <div onClick={props.onClick} className={`checkoutHeader ${props.active && "active"}`}>
                <div>
                    <span className="stepNumber">{props.stepNumber}</span>
                    <span className="stepTitle">{props.title}</span>
                </div>
            </div>
            {props.body && props.body}
        </div>
    );
};

const CheckoutPage = (props) => {
    const user = useSelector((state) => state.user);
    const auth = useSelector((state) => state.auth);

    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const onAddressSubmit = () => {};

    useEffect(() => {
        dispatch(getAddress());
    }, []);

    return (
        <Layout>
            <div className="cartContainer" style={{ alignItems: "flex-start" }}>
                <div className="checkoutContainer">
                    {/* check if user logged in or not */}
                    <CheckoutStep
                        stepNumber={"1"}
                        title={"LOGIN"}
                        active={!auth.authenticate}
                        body={
                            <div className="loggedInId">
                                <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                                <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                            </div>
                        }
                    />
                    <CheckoutStep
                        stepNumber={"2"}
                        title={"DELIVERY ADDRESS"}
                        active={true}
                        body={
                            <>
                                {user.address.map((adr) => (
                                    <div className="flexRow addressContainer">
                                        <div>
                                            <input name="address" type="radio" />
                                        </div>
                                        <div className="flexRow sb addressinfo">
                                            <div>
                                                <div>
                                                    <span className="addressName">{adr.name}</span>
                                                    <span className="addressType">{adr.addressType}</span>
                                                    <span className="addressMobileNumber">{adr.mobileNumber}</span>
                                                </div>
                                                <div>{adr.address}</div>
                                                <MaterialButton
                                                    title="DELIVERY HERE"
                                                    style={{
                                                        width: "250px",
                                                    }}
                                                />
                                            </div>
                                            <div>edit</div>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    />
                    <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
                </div>
            </div>
        </Layout>
    );
};

export default CheckoutPage;
