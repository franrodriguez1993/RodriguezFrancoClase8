const express = require("express");
const app = express();
const router = express.Router();

let PRODUCTOS_LISTA = [
  {
    id: 1,
    title: "Lapicera",
    price: "100",
    thumbnail:
      "https://tiendup.b-cdn.net/business/48/products/p7Gomp_5d6833726c945_large.png",
  },
];

//obtener todos los productos:
router.get("/", (req, res) => {
  res.json(PRODUCTOS_LISTA);
});

//obtener un producto:
router.get("/:id", (req, res) => {
  const { id } = req.params;

  let producto = PRODUCTOS_LISTA.filter((item) => item.id == id);
  if (producto.length === 0) {
    return res.status(404).json({ error: "El producto no existe" });
  }
  res.status(200).json(producto);
});

//Agregar un producto:
router.post("/", (req, res) => {
  const { title, price, thumbnail } = req.body;

  const productoCheck = PRODUCTOS_LISTA.filter((item) => item.title === title);
  if (productoCheck.length !== 0) {
    return res
      .status(400)
      .json({ error: "El producto ya se encuentra en la base de datos" });
  }

  if (!title.trim() || !price.trim() || !thumbnail.trim()) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  let id = PRODUCTOS_LISTA.length + 1;
  PRODUCTOS_LISTA.push({ id, title, price, thumbnail });
  res.json({ msg: "Producto agregado correctamente." });
});

//Editar un producto:
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, price, thumbnail } = req.body;

  let producto = PRODUCTOS_LISTA.filter((item) => item.id == id);
  if (producto.length === 0) {
    return res.status(404).json({ error: "El producto no existe" });
  } else {
    producto[0].title = title;
    producto[0].price = price;
    producto[0].thumbnail = thumbnail;

    res.json({ msg: "Producto actualizado con éxito." });
  }
});

//Eliminar un producto:
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  let productoCheck = PRODUCTOS_LISTA.filter((item) => item.id == id);

  if (productoCheck.length === 0) {
    return res.status(404).json({ error: "El producto no existe" });
  } else {
    PRODUCTOS_LISTA = PRODUCTOS_LISTA.filter((item) => item.id != id);

    res.status(200).json({ msg: "Producto eliminado correctamente." });
  }
});

module.exports = router;
