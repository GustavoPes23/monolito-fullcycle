import { Sequelize } from "sequelize-typescript";
import InvoiceModel from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";

describe("Invoice facade test", () => {
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
    const facade = InvoiceFacadeFactory.create();
    // const repository = new InvoiceRepository();
    // const generateUseCase = new GenerateInvoiceUseCase(repository);
    // const facade = new InvoiceFacade({
    //   generateUseCase,
    //   findUseCase: undefined,
    // });

    const input = {
      id: "1",
      name: "Invoice 1",
      document: "document 1",
      street: "street 1",
      number: "number 1",
      complement: "complement 1",
      city: "city 1",
      state: "state 1",
      zipCode: "zipCode 1",
      items: [
        {
          id: "1",
          name: "Item 1",
          price: 100,
        },
      ],
    };

    await facade.generate(input);

    const invoice = await InvoiceModel.findOne({ where: { id: "1" } });
    const invoiceItems = JSON.parse(invoice!.dataValues.items);

    expect(invoice).toBeDefined();
    expect(invoice!.dataValues.id).toBe(input.id);
    expect(invoice!.dataValues.name).toBe(input.name);
    expect(invoice!.dataValues.document).toBe(input.document);
    expect(invoice!.dataValues.street).toBe(input.street);
    expect(invoice!.dataValues.number).toBe(input.number);
    expect(invoice!.dataValues.complement).toBe(input.complement);
    expect(invoice!.dataValues.city).toBe(input.city);
    expect(invoice!.dataValues.state).toBe(input.state);
    expect(invoice!.dataValues.zipCode).toBe(input.zipCode);
    expect(invoiceItems[0].id).toBe(input.items[0].id);
    expect(invoiceItems[0].name).toBe(input.items[0].name);
    expect(invoiceItems[0].price).toBe(input.items[0].price);
  });

  it("should find a invoice", async () => {
    // const repository = new InvoiceRepository();
    // const findUseCase = new FindInvoiceUseCase(repository);
    // const facade = new InvoiceFacade({
    //   generateUseCase: undefined,
    //   findUseCase,
    // });
    const facade = InvoiceFacadeFactory.create();

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

    const result = await facade.find({
      id: "1",
    });

    expect(result.id).toBe(invoice.dataValues.id);
    expect(result.name).toBe(invoice.dataValues.name);
    expect(result.document).toBe(invoice.dataValues.document);
    expect(result.address.street).toBe(invoice.dataValues.street);
    expect(result.address.number).toBe(invoice.dataValues.number);
    expect(result.address.complement).toBe(invoice.dataValues.complement);
    expect(result.address.city).toBe(invoice.dataValues.city);
    expect(result.address.state).toBe(invoice.dataValues.state);
    expect(result.address.zipCode).toBe(invoice.dataValues.zipCode);
    expect(result.items[0].id).toBe(invoiceItems[0].id);
    expect(result.items[0].name).toBe(invoiceItems[0].name);
    expect(result.items[0].price).toBe(invoiceItems[0].price);
    expect(result.createdAt).toStrictEqual(invoice.dataValues.createdAt);
  });
});
