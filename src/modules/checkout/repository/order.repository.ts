import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import { OrderModel } from "./order.model";

export class OrderRepository implements CheckoutGateway {
  async addOrder(order: Order): Promise<Order> {
    const orderCreated = await OrderModel.create({
      id: order.id!.id,
      invoiceId: order.invoiceId,
      status: order.status,
      products: JSON.stringify(order.products.map((product) => ({
        id: product.id!.id,
        name: product.name,
        description: product.description,
        salesPrice: product.salesPrice
      }))),
      client: JSON.stringify({
        id: order.client.id!.id,
        name: order.client.name,
        email: order.client.email,
        document: order.client.document,
        street: order.client.street,
        number: order.client.number,
        complement: order.client.complement,
        city: order.client.city,
        state: order.client.state,
        zipCode: order.client.zipCode
      }),
    });

    const products = JSON.parse(orderCreated.dataValues.products);
    const client = JSON.parse(orderCreated.dataValues.client);

    return new Order({
      id: new Id(orderCreated.dataValues.id),
      invoiceId: orderCreated.dataValues.invoiceId,
      status: orderCreated.dataValues.status,
      products: products.map((product: any) => (
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
        })
      )),
      client: new Client({
        id: new Id(client.id),
        name: client.name,
        email: client.email,
        document: client.document,
        street: client.street,
        number: client.number,
        complement: client.complement,
        city: client.city,
        state: client.state,
        zipCode: client.zipCode,
      }),
    })
  }

  async findOrder(id: string): Promise<Order | null> {
    const orderDb = await OrderModel.findOne({ where: { id } });

    if (!orderDb) {
      return null;
    }

    const products = JSON.parse(orderDb.dataValues.products);
    const client = JSON.parse(orderDb.dataValues.client);

    return new Order({
      id: new Id(orderDb.dataValues.id),
      invoiceId: orderDb.dataValues.invoiceId,
      status: orderDb.dataValues.status,
      products: products.map((product: any) => (
        new Product({
          id: new Id(product._id._id),
          name: product._name,
          description: product._description,
          salesPrice: product._salesPrice,
        })
      )),
      client: new Client({
        id: new Id(client._id._id),
        name: client._name,
        email: client._email,
        document: client._document,
        street: client._street,
        number: client._number,
        complement: client._complement,
        city: client._city,
        state: client._state,
        zipCode: client._zipCode,
      }),
    });
  }
}
