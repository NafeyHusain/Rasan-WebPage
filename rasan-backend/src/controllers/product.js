const Product = require("../models/product");
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/categories");

exports.createProduct = (req, res) => {
    const { name, price, description, quantity, category, createdBy } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map((file) => {
            return { img: file.filename };
        });
    }
    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPictures,
        category,
        createdBy: req.user._id,
    });

    product
        .save()
        .then((product) => {
            if (product) {
                return res.status(201).json({
                    product,
                });
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error,
            });
        });
};

exports.getProductsBySlug = (req, res) => {
    const { slug } = req.params;
    Category.findOne({ slug: slug })
        .select("_id")
        .then((category) => {
            if (category) {
                Product.find({ category: category._id })
                    .then((products) => {
                        if (products.length > 0) {
                            return res.status(200).json({
                                products,
                                productsByPrice: {
                                    under5k: products.filter((product) => product.price <= 5000),
                                    under10k: products.filter(
                                        (product) => product.price > 5000 && product.price <= 10000
                                    ),
                                },
                            });
                        }
                    })
                    .catch((error) => {
                        return res.status(400).json({
                            error,
                        });
                    });
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error,
            });
        });
};
