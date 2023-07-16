const User = require("../../models/user");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user)
                return res.status(400).json({
                    message: "admin already exists",
                });
            const { firstName, lastName, email, password } = req.body;

            const _user = new User({
                firstName,
                lastName,
                email,
                password,
                userName: Math.random().toString(),
                role: "admin",
            });
            _user
                .save()
                .then((data) => {
                    if (data) {
                        return res.status(201).json({
                            message: "admin created successfully",
                        });
                    }
                })
                .catch(() => {
                    return res.status(400).json({
                        message: "something wrong with the database",
                    });
                });
        })
        .catch((err) => {
            console.log("error occured in finding the email id from database", err);
        });
};

exports.signin = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                if (user.authenticate(req.body.password) && user.role === "admin") {
                    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    });
                    const { _id, firstName, lastName, email, role, fullName } = user;
                    res.cookie("token", token, { expiresIn: "1d" });
                    res.status(200).json({
                        token,
                        user: {
                            _id,
                            firstName,
                            lastName,
                            email,
                            role,
                            fullName,
                        },
                    });
                } else {
                    return res.status(400).json({ message: "Invalid password" });
                }
            } else {
                return res.status(400).json({ message: "went wrong" });
            }
        })
        .catch((err) => {
            return res.status(400).json({ message: err.toString() });
        });
};

exports.signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
        message: "Signout successfully...!",
    });
};
