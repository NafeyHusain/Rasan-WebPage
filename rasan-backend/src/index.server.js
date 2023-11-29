const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const path = require("path");

const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const cartRoutes = require("./routes/cart");
const pageRoutes = require("./routes/admin/page");

const initialData = require("./routes/admin/initialData");

env.config();

// mongodb+srv://root:<password>@cluster0.8wusolc.mongodb.net/test
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.8wusolc.mongodb.net/${process.env.MONGO_DB_DATABASE}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("database connected");
    });

app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));

app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", cartRoutes);

app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", pageRoutes);

app.use("/api", initialData);

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
