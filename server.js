const express = require("express");
const {
  syncAndSeed,
  models: { Category },
} = require("./db");
const app = express();
const path = require("path");

app.use("/dist", express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res, next) =>
  res.sendFile(path.join(__dirname, "index.html"))
);

app.get("/api/categories", async (req, res) => {
  try {
    res.send(await Category.findAll());
  } catch (ex) {
    next(ex);
  }
});

const setUp = async () => {
  try {
    await syncAndSeed();
    const PORT = 3000;
    await app.listen(PORT, () => console.log(`App listening in port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

setUp();
