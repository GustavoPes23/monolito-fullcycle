import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";
import Order from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import Client from "../domain/client.entity";

const mockDate = new Date(2000, 1, 1);

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([OrderModel]);
    await sequelize.sync();

    jest.useFakeTimers();
    jest.setSystemTime(mockDate);
  });

  afterEach(async () => {
    await sequelize.close();
    jest.useRealTimers();
  });

  it("should create a order", async () => {
    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      salesPrice: 100,
      description: "Description 1",
    });

    const product2 = new Product({
      id: new Id("2"),
      name: "Product 2",
      salesPrice: 200,
      description: "Description 2",
    });

    const orderClient = new Client({
      id: new Id("1"),
      name: "John Doe",
      email: "john.doe@email.com",
      document: "0000",
      street: "Main Street",
      complement: "House",
      number: "123",
      city: "Palo Alto",
      state: "CA",
      zipCode: "12552",
    });

    const order = new Order({
      client: orderClient,
      products: [product1, product2],
      invoiceId: "123",
    });

    order.approved();

    const orderRepository = new OrderRepository();
    const result = await orderRepository.addOrder(order);

    expect(result).toEqual(order);
  });

  it("should find an order", async () => {
    const product1 = new Product( {
        id: new Id("35"),
        name: "Product 1",
        description: "Description 1",
        salesPrice: 100,
    });

    const product2 = new Product({
      id: new Id("63"),
      name: "Product 2",
      description: "Description 2",
      salesPrice: 200,
    });

    const client = new Client({
      id: new Id("1"),
      name: "John Doe",
      email: "john.doe@email.com",
      document: "0000",
      street: "Main Street",
      complement: "House",
      number: "123",
      city: "Palo Alto",
      state: "CA",
      zipCode: "12552",
    });

    const orderData = {
      id: "321",
      createdAt: mockDate,
      updatedAt: mockDate,
      status: "approved",
      invoiceId: "anyInvoiceId",
      client: JSON.stringify(client),
      products: JSON.stringify([ product1, product2 ]),
    };

    await OrderModel.create(orderData);
    const orderRepository = new OrderRepository();

    const result = await orderRepository.findOrder("321");

    expect(result!.id!.id).toEqual(orderData.id);
    expect(result!.status).toEqual(orderData.status);
    expect(result!.invoiceId).toEqual(orderData.invoiceId);

    const clientResult = result!.client;
    expect(clientResult.id!.id).toEqual(client.id!.id);
    expect(clientResult.name).toEqual(client.name);
    expect(clientResult.email).toEqual(client.email);
    expect(clientResult.street).toEqual(client.street);

    const firstProductResult = result!.products[0];
    expect(firstProductResult.id!.id).toEqual(product1.id!.id);
    expect(firstProductResult.name).toEqual(product1.name);
    expect(firstProductResult.salesPrice).toEqual(
      product1.salesPrice
    );
    expect(firstProductResult.description).toEqual(
      product1.description
    );
  });
});
