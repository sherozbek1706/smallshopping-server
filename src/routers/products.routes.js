import { Router } from "express";
import {
  postProducts,
  getProducts,
  deleteProducts,
  getOneProducts,
  updateProducts,
} from "../controller/products.js";
import { verify } from "../middleware/verify.js";

export const productsRouter = Router();

productsRouter.post("/products", verify, postProducts);
productsRouter.get("/products", verify, getProducts);
productsRouter.get("/products/:id", verify, getOneProducts);
productsRouter.delete("/products/:id", verify, deleteProducts);
productsRouter.put("/products/:id", verify, updateProducts);
