import { Router } from "express";
import {
  postProducts,
  getProducts,
  deleteProducts,
} from "../controller/products.js";

export const productsRouter = Router();

productsRouter.post("/products", postProducts);
productsRouter.get("/products", getProducts);
productsRouter.delete("/products/:id", deleteProducts);
