import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../actions";
import Input from "../../components/UI/Input";
import Modal from "../../components/UI/Modal";
import CheckboxTree from "react-checkbox-tree";
import { IoIosCheckboxOutline, IoIosCheckbox, IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const Category = (props) => {
    const category = useSelector((state) => state.category);
    const dispatch = useDispatch();
    useEffect(() => {}, []);

    const [show, setShow] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [parentCategoryId, setParentCategoryId] = useState("");
    const [categoryImage, setCategoryImage] = useState("");
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const handleClose = () => {
        const form = new FormData();
        form.append("name", categoryName);
        form.append("parentId", parentCategoryId);
        form.append("categoryImage", categoryImage);
        dispatch(addCategory(form));
        setCategoryName("");
        setParentCategoryId("");
        setShow(false);
    };
    const handleShow = () => setShow(true);

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push({
                label: category.name,
                value: category._id,
                children: category.children.length > 0 && renderCategories(category.children),
            });
        }
        return myCategories;
    };

    const createCategoryList = (categories, options = []) => {
        for (let category of categories) {
            options.push({
                value: category._id,
                name: category.name,
                parentId: category.parentId,
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options);
            }
        }
        return options;
    };

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    };

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        console.log({ checked, expanded, categories });
    };

    return (
        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <h3>Category</h3>
                            <button onClick={handleShow}>Add</button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={12}>
                        <CheckboxTree
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={(checked) => setChecked(checked)}
                            onExpand={(expanded) => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />,
                            }}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <button>Delete</button>
                        <button onClick={updateCategory}>Edit</button>
                    </Col>
                </Row>
            </Container>
            <Modal show={show} handleClose={handleClose} modelTitle={"Add New Category"}>
                <Input
                    placeholder={"Cateogory Name"}
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                <select
                    className="form-control"
                    value={parentCategoryId}
                    onChange={(e) => setParentCategoryId(e.target.value)}
                >
                    <option>Select category</option>
                    {createCategoryList(category.categories).map((option) => (
                        <option key={option.name} value={option.value}>
                            {option.name}
                        </option>
                    ))}
                </select>

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>

            {/* edit categories */}
            <Modal
                show={updateCategoryModal}
                handleClose={() => setUpdateCategoryModal(false)}
                modelTitle={"Update Categories"}
                size="lg"
            >
                <Row>
                    <Col>
                        <h6>Expanded</h6>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Input
                            placeholder={"Cateogory Name"}
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                        />
                    </Col>
                    <Col>
                        <select
                            className="form-control"
                            value={parentCategoryId}
                            onChange={(e) => setParentCategoryId(e.target.value)}
                        >
                            <option>Select category</option>
                            {createCategoryList(category.categories).map((option) => (
                                <option key={option.name} value={option.value}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </Col>
                    <Col>
                        <select className="form-control">
                            <option value="">Select Type</option>
                            <option value="store">Store</option>
                            <option value="product">Product</option>
                            <option value="page">Page</option>
                        </select>
                    </Col>
                </Row>

                <input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Modal>
        </Layout>
    );
};
export default Category;
