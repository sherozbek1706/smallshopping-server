import express from "express";
import { readFile, writeFile } from "../utils/lib/fs.js";
/**
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export const postProducts = (req, res) => {
  try {
    const { name, price, count, user_id } = req.body;
    const data = readFile("products.json");

    const newProduct = {
      id: 1,
      name,
      price,
      count,
      is_allow: false,
      user_id,
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
