const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true
}))

app.use("/uploads", express.static(path.join(__dirname, "src/assets/uploads")));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})