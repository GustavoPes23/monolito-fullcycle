import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceModel from "./invoice.model";
import Invoice from "../domain/invoice.entity";
import Address from "../value-object/address";
import InvoiceItems from "../../invoice-items/domain/invoice-items.entity";
import InvoiceRepository from "./invoice.repository";

describe("Invoice repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should generate a invoice", async () => {
        const address = new Address({
            street: "street 1",
            number: "number 1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "zipCode 1"
        });

        const invoiceItems = new InvoiceItems({ 
            id: new Id("1"), 
            name: "Item 1", 
            price: 100
        });

        const invoice = new Invoice({
            id: new Id("1"),
            name: "Invoice 1",
            document: "Invoice 1 document",
            address,
            items: [invoiceItems],
        });

        const repository = new InvoiceRepository();

        await repository.generate(invoice);

        const invoiceDb = await InvoiceModel.findOne({ where: { id: "1" } });

        expect(invoiceDb).toBeDefined();
        expect(invoiceDb!.dataValues.id).toBe(invoice.id!.id);
        expect(invoiceDb!.dataValues.name).toBe(invoice.name);
        expect(invoiceDb!.dataValues.document).toBe(invoice.document);
        expect(invoiceDb!.dataValues.createdAt).toStrictEqual(invoice.createdAt);
        expect(invoiceDb!.dataValues.updatedAt).toStrictEqual(invoice.updatedAt);
    });

    it("should find a invoice", async () => {
        const invoiceItems = [
            { 
                id: "1", 
                name: "Item 1", 
                price: 100
            }
        ];

        const invoice = await InvoiceModel.create({
            id: "1",
            name: "Invoice 1",
            document: "Invoice 1 document",
            street: "street 1",
            number: "number 1",
            complement: "complement 1",
            city: "city 1",
            state: "state 1",
            zipCode: "zipCode 1",            
            items: JSON.stringify(invoiceItems),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const repository = new InvoiceRepository();
        const result = await repository.find(invoice.dataValues.id);

        expect(result.id!.id).toEqual(invoice.dataValues.id);
        expect(result.name).toEqual(invoice.dataValues.name);
        expect(result.document).toEqual(invoice.dataValues.document);
        expect(result.address.street).toEqual(invoice.dataValues.street);
        expect(result.address.number).toEqual(invoice.dataValues.number);
        expect(result.address.complement).toEqual(invoice.dataValues.complement);
        expect(result.address.city).toEqual(invoice.dataValues.city);
        expect(result.address.state).toEqual(invoice.dataValues.state);
        expect(result.address.zipCode).toEqual(invoice.dataValues.zipCode);
        expect(result.items[0].id!.id).toEqual(invoiceItems[0].id);
        expect(result.items[0].name).toEqual(invoiceItems[0].name);
        expect(result.items[0].price).toEqual(invoiceItems[0].price);
        expect(result.createdAt).toEqual(invoice.dataValues.createdAt);
        expect(result.updatedAt).toEqual(invoice.dataValues.updatedAt);
    });
});