import express, { type Express } from "express";
import { Sequelize } from "sequelize-typescript";
import { ProductModel as AdmProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { OrderModel } from "../../modules/checkout/repository/order.model";
import InvoiceModel from "../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductModel from "../../modules/store-catalog/repository/product.model";
import { productsRoute } from "./routes/product.routes";
import { clientRoute } from "./routes/client.route";
import { checkouRoute } from "./routes/checkout.route";
import { invoiceRoute } from "./routes/invoice.route";

export const app: Express = express();
app.use(express.json());

app.use("/products", productsRoute);
app.use("/clients", clientRoute);
app.use("/checkout", checkouRoute);
app.use("/invoice", invoiceRoute);

export let sequelize: Sequelize;

(async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
  });

  sequelize.addModels([
    OrderModel,
    ClientModel,
    InvoiceModel,
    TransactionModel,
    AdmProductModel,
    ProductModel,
  ]);

  await sequelize.sync();
})();
