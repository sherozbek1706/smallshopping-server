import { Router } from "express";
import { postProducts } from "../controller/products.js";

export const productsRouter = Router();

productsRouter.post("/products", postProducts);
