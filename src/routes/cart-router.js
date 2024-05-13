import { Router } from "express";
import CartsManager from "../managers/carts-manager.js";
import { __dirname } from "../path.js";

const cartManager = new CartsManager(`${__dirname}/db/carts.json`);
const cartRouter = Router();

cartRouter.post("/:idCart/product/:idProd", async (req, res, next) => {
    try {
       const { idProd } = req.params;
       const { idCart } = req.params;
       const cart = await cartManager.saveProductToCart(idCart, idProd);
       res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 });

cartRouter.post("/", async (req, res) => {
    try {
      res.json(await cartManager.createCart());
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

cartRouter.get("/:idCart", async (req, res) => {
    try {
      const {idCart} = req.params
      res.json(await cartManager.getCartById(idCart))
    } catch (error) {
      console.log(error);
    }
  });

export default cartRouter