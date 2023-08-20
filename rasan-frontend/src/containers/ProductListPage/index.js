import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../actions";
import { useParams } from "react-router-dom";
import "./style.css";
import { generatePublicUrl } from "../../urlConfig";

const ProductListPage = () => {
    const product = useSelector((state) => state.product);
    const [priceRange, setPriceRange] = useState({
        under5k: 5000,
        under10k: 10000,
    });
    const { slug } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsBySlug(slug));
    }, []);
    return (
        <Layout>
            {Object.keys(product.productsByPrice).map((key, index) => {
                return (
                    <div className="card" key={index}>
                        <div className="cardHeader">
                            <div>
                                {slug} under {priceRange[key]}
                            </div>
                            <button>View all</button>
                        </div>
                        <div style={{ display: "flex" }}>
                            {product.productsByPrice[key].map((product) => (
                                <div className="productContainer">
                                    <div className="productImgContainer">
                                        <img src={generatePublicUrl(product.productPictures[0].img)} alt="" />
                                    </div>
                                    <div className="productInfo">
                                        <div style={{ margin: "5px 0" }}>{product.name} </div>
                                        <div>
                                            <span>4.3</span>&nbsp;
                                            <span>2232</span>
                                        </div>
                                        <div className="productPrice">{product.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </Layout>
    );
};

export default ProductListPage;
