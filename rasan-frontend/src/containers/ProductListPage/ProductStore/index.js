import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { useParams } from "react-router-dom";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";
import Card from "../../../components/UI/Card";
import { MaterialButton } from "../../../components/MaterialUI";
import Rating from "../../../components/UI/Rating";
import Price from "../../../components/UI/Price";

const ProductStore = (props) => {
    const product = useSelector((state) => state.product);
    const priceRange = product.priceRange;
    const { slug } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsBySlug(slug));
    }, []);
    return (
        <>
            {Object.keys(product.productsByPrice).map((key, index) => {
                return (
                    <Card
                        key={index}
                        headerleft={` ${slug} under ${priceRange[key]}`}
                        headerright={
                            <MaterialButton
                                title={"VIEW ALL"}
                                style={{
                                    width: "96px",
                                }}
                                bgColor="#2874f0"
                                fontSize="12px"
                            />
                        }
                        style={{ width: "calc(100%-40px)", margin: "20px" }}
                    >
                        <div style={{ display: "flex" }}>
                            {product.productsByPrice[key].map((product, index) => (
                                <Link
                                    to={`/${product.slug}/${product._id}/p`}
                                    style={{ display: "block" }}
                                    className="productContainer"
                                    key={index}
                                >
                                    <div className="productImgContainer">
                                        <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                    </div>
                                    <div className="productInfo">
                                        <div style={{ margin: "5px 0" }}>{product.name} </div>
                                        <div>
                                            <Rating value="4.3" />
                                            &nbsp;&nbsp;
                                            <span
                                                style={{
                                                    color: "#777",
                                                    fontWeight: "500",
                                                    fontSize: "12px",
                                                }}
                                            >
                                                (3353)
                                            </span>
                                        </div>
                                        <Price value={product.price} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Card>
                );
            })}
        </>
    );
};

export default ProductStore;
