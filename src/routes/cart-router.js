import { Router } from "express";
import CartsManager from "../managers/carts-manager.js";
import * as controller from "../controllers/cart.controllers.js";
import { __dirname } from "../path.js";

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.post("/", controller.create);

router.put("/:id", controller.update);

router.delete("/:id", controller.remove);

router.post("/:idCart/products/:idProd", controller.addProdToCart);

router.delete("/:idCart/products/:idProd", controller.removeProdToCart);

router.put("/:idCart/products/:idProd", controller.updateProdQuantityToCart);

router.delete("/clear/:idCart", controller.clearCart);

export default router;


const cartManager = new CartsManager(`${__dirname}/db/carts.json`);
const cartRouter = Router();

cartRouter.post("/:idCart/product/:idProd", async (req, res, next) => {
    try {
       const { idProd } = req.params;
       const { idCart } = req.params;
       const cart = await cartManager.addProductToCart(idCart, idProd);
       res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
 });

cartRouter.post("/", async (req, res) => {
    try {
      const cart = await cartManager.newCarts();
      res.status(201).json(cart);
    } catch (error) {
      res.status(500).json(error.message);
    }
  });

cartRouter.get("/:idCart", async (req, res) => {
    try {
      const {idCart} = req.params;
      const cart = await cartManager.getCartById(idCart);
      !cart ? res.status(404).json({ error: "Cart not found" }) : res.status(200).json(cart);
    } catch (error) {
      console.log(error);
    }
  });
