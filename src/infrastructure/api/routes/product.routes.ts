import express, { Request, Response } from "express";

import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";

export const productsRoute = express.Router();

productsRoute.post("/", async (req: Request, res: Response) => {
  const facade = ProductAdmFacadeFactory.create();

  try {
    const { id, name, description, stock, purchasePrice } = req.body;

    await facade.addProduct({
        id,
        name,
        description,
        stock,
        purchasePrice,
    });

    res.status(201).send();
  } catch (error) {
    console.log("error", error)
    res.status(400).send(error);
  }
});
