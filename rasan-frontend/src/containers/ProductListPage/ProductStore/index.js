import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import { useParams } from "react-router-dom";
import { generatePublicUrl } from "../../../urlConfig";
import { Link } from "react-router-dom";

const ProductStore = (props) => {
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
        <>
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
                                            <span>4.3</span>&nbsp;
                                            <span>2232</span>
                                        </div>
                                        <div className="productPrice">{product.price}</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                );
            })}
        </>
    );
};

export default ProductStore;
