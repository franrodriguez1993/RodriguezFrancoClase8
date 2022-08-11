const express = require("express");
const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/productos", require("./routes/productos.routes"));
const PORT = 8080;
app.listen(PORT, () => {
  console.log("Servidor en: http://localhost:" + PORT);
});
