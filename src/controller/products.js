import express from "express";
import { readFile, writeFile } from "../utils/lib/fs.js";
import { v4 } from "uuid";
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const postProducts = (req, res) => {
  try {
    const { name, price, count } = req.body;
    const data = readFile("products.json");
    const { id: userId } = req.user;
    const newProduct = {
      id: v4(),
      name,
      price,
      count,
      is_allow: false,
      user_id: userId,
    };

    data.push(newProduct);

    writeFile("products.json", data);

    res.status(201).json({
      status: 201,
      data: newProduct,
      msg: "Successfuly created Product",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

export const getProducts = (req, res) => {
  try {
    const data = readFile("products.json");

    res.status(200).json({
      status: 200,
      data,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const getOneProducts = (req, res) => {
  try {
    const data = readFile("products.json");
    const { id } = req.params;

    const productIdx = data.findIndex((prod) => prod.id == id);

    if (productIdx == -1) {
      return res.status(404).json({
        status: 404,
        msg: "Product not found!",
      });
    }

    const product = data.find((prod) => prod.id == id);

    res.status(200).json({
      status: 200,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */

export const deleteProducts = (req, res) => {
  try {
    const data = readFile("products.json");
    const { id } = req.params;
    const { id: userId } = req.user;

    const productIdx = data.findIndex((prod) => prod.id == id);

    if (productIdx == -1) {
      return res.status(404).json({
        status: 404,
        msg: "Product not found!",
      });
    }

    const deletedProduct = data.find((prod) => prod.id == id);

    if (deletedProduct.user_id != userId) {
      return res.status(403).json({
        status: 403,
        msg: "This product don't has your!",
      });
    }

    data.splice(productIdx, 1);

    writeFile("products.json", data);

    res.status(200).json({
      status: 200,
      data: deletedProduct,
      msg: "Successfuly deleted Product",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};

export const updateProducts = (req, res) => {
  try {
    const data = readFile("products.json");
    const { id } = req.params;
    const body = req.body;
    const { id: userId } = req.user;

    const productIdx = data.findIndex((prod) => prod.id == id);

    if (productIdx == -1) {
      return res.status(404).json({
        status: 404,
        msg: "Product not found!",
      });
    }

    const oldProduct = data.find((prod) => prod.id == id);

    if (oldProduct.user_id != userId) {
      return res.status(403).json({
        status: 403,
        msg: "This product don't has your!",
      });
    }

    const updatedProducts = { ...oldProduct, ...body };

    data.splice(productIdx, 1, updatedProducts);

    writeFile("products.json", data);

    res.status(200).json({
      status: 200,
      data: updatedProducts,
      msg: "Successfuly updated Product",
    });
  } catch (error) {
    res.status(500).json({
      msg: error.message,
    });
  }
};
