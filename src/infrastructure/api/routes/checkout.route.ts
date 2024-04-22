import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from "../../../modules/store-catalog/factory/facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/payment.facade.factory";
import InvoiceFacadeFactory from "../../../modules/invoice/factory/invoice.facade.factory";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import { OrderRepository } from "../../../modules/checkout/repository/order.repository";

export const checkouRoute = express.Router();
const repository = new OrderRepository();

checkouRoute.post("/", async (req: Request, res: Response) => {
    const clientFacade = ClientAdmFacadeFactory.create();
    const productFacade = ProductAdmFacadeFactory.create();
    const storeCatalogFacade = StoreCatalogFacadeFactory.create();
    const paymentFacade = PaymentFacadeFactory.create();
    const invoiceFacade = InvoiceFacadeFactory.create();

    const usecase = new PlaceOrderUseCase(
        clientFacade,
        productFacade,
        storeCatalogFacade,
        repository,
        invoiceFacade,
        paymentFacade
    );

    try {
        const { clientId, products } = req.body;

        const output = await usecase.execute({
            clientId,
            products
        });

        res.status(200).send(output);
    } catch (error) {
        res.status(400).send(error);
    }
});