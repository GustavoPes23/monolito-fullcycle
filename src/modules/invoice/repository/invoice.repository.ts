import type InvoiceGateway from "../gateway/invoice.gateway";
import type InvoiceItemsInterface from "../../invoice-items/domain/invoice-items.interface";

import Invoice from "../domain/invoice.entity";

import InvoiceModel from "./invoice.model";
import Address from "../value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../invoice-items/domain/invoice-items.entity";

export default class InvoiceRepository implements InvoiceGateway {
  public async generate(invoice: Invoice): Promise<void> {
    const items = invoice.items.map((item) => ({
      id: item.id!.id,
      name: item.name,
      price: item.price
    }));

    await InvoiceModel.create({
      id: invoice.id!.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: JSON.stringify(items),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }

  public async find(id: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({ where: { id } });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const address = new Address({
      street: invoice.dataValues.street,
      number: invoice.dataValues.number,
      complement: invoice.dataValues.complement,
      city: invoice.dataValues.city,
      state: invoice.dataValues.state,
      zipCode: invoice.dataValues.zipCode,
    });

    const invoiceItems = JSON.parse(invoice.dataValues.items).map((item: InvoiceItemsInterface) => (
      new InvoiceItems({
        id: new Id(String(item.id)),
        name: item.name,
        price: item.price,
      })
    ));
    
    return new Invoice({
      id: new Id(invoice.dataValues.id),
      name: invoice.dataValues.name,
      document: invoice.dataValues.document,
      address: address,
      items: invoiceItems,
      createdAt: invoice.dataValues.createdAt,
      updatedAt: invoice.dataValues.updatedAt,
    });
  }
}
