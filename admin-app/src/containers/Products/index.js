import React, { useState } from "react";
import Layout from "../../components/Layouts";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Input from "../../components/UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../actions";

const Products = (props) => {
    const category = useSelector((state) => state.category);

    const [show, setShow] = useState("");
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");

    const [categoryId, setCategoryId] = useState("");
    const [productPicture, setProductPicture] = useState([]);

    const dispatch = useDispatch();

    const handleClose = () => {
        const form = new FormData();
        form.append("name", name);
        form.append("quantity", quantity);
        form.append("price", price);
        form.append("description", description);
        form.append("category", categoryId);

        for (let pic of productPicture) {
            form.append("productPicture", pic);
        }
        dispatch(addProduct(form));
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const handleProductPicture = (e) => {
        setProductPicture([...productPicture, e.target.files[0]]);
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({ value: category._id, name: category.name });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Product</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        label="Name"
                        placeholder={"Product Name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                        label="Quantity"
                        placeholder={"Quantity "}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                    <Input
                        label="Description"
                        placeholder={"Description "}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        label="price"
                        placeholder={"Price"}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <select className="form-control" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                        <option>Select category</option>
                        {createCategoryList(category.categories).map((option) => (
                            <option key={option.name} value={option.value}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                    {productPicture.length > 0
                        ? productPicture.map((pic, index) => <div key={index}>{pic.name}</div>)
                        : null}
                    <input type="file" name="productPicture" onChange={handleProductPicture} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Layout>
    );
};

export default Products;
