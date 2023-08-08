import { Router } from "express";
import {
  postProducts,
  getProducts,
  deleteProducts,
  getOneProducts,
  updateProducts,
} from "../controller/products.js";

export const productsRouter = Router();

productsRouter.post("/products", postProducts);
productsRouter.get("/products", getProducts);
productsRouter.get("/products/:id", getOneProducts);
productsRouter.delete("/products/:id", deleteProducts);
productsRouter.put("/products/:id", updateProducts);
