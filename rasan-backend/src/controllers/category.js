const slugify = require("slugify");
const Category = require("../models/categories");
const shortId = require("shortid");

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat) => cat.parentId == parentId);
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id),
        });
    }
    return categoryList;
}
exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}`,
    };

    if (req.file) {
        categoryObj.categoryImage = process.env.API + "/public/" + req.file.filename;
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);

    cat.save()
        .then((category) => {
            if (category) {
                return res.status(201).json({
                    category,
                });
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error,
            });
        });
};

exports.getCategory = (req, res) => {
    Category.find({})
        .then((categories) => {
            if (categories) {
                const categoryList = createCategories(categories);
                res.status(200).json({ categoryList });
            }
        })
        .catch((error) => {
            return res.status(400).json({
                error,
            });
        });
};

exports.updateCategories = async (req, res) => {
    const { _id, name, parentId, type } = req.body;
    const updatedCategories = [];
    if (name instanceof Array) {
        for (let i = 0; i < name.length; i++) {
            const category = {
                name: name[i],
                type: type[i],
            };
            if (parentId[i] !== "") {
                category.parentId = parentId[i];
            }

            const updatedCategory = await Category.findOneAndUpdate({ _id: _id[i] }, category, { new: true });
            updatedCategories.push(updatedCategory);
        }
        return res.status(201).json({ updateCategories: updatedCategories });
    } else {
        const category = {
            name,
            type,
        };
        if (parentId !== "") {
            category.parentId = parentId;
        }
        const updatedCategory = await Category.findOneAndUpdate({ _id }, category, { new: true });
        return res.status(201).json({ updatedCategory });
    }
};

exports.deleteCategories = async (req, res) => {
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for (let i = 0; i < ids.length; i++) {
        const deleteCategory = await Category.findOneAndDelete({ _id: ids[i] });
        deletedCategories.push(deleteCategory);
    }
    console.log(deletedCategories);
    if (deletedCategories.length == ids.length) {
        res.status(200).json({ message: "categories removed  " });
    } else {
        res.status(200).json({ message: "failed to delete categories" });
    }
};
