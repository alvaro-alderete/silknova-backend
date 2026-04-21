const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("El backend funciona");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});