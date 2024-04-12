import type InvoiceItemsInterface from "./invoice-items.interface";

import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

interface InvoceItemsProps {
  id?: Id;
  name: string;
  price: number;
}

export default class InvoiceItems
  extends BaseEntity
  implements InvoiceItemsInterface
{
  private _name: string;
  private _price: number;

  constructor(invoiceItemsProps: InvoceItemsProps) {
    super(invoiceItemsProps.id);
    this._name = invoiceItemsProps.name;
    this._price = invoiceItemsProps.price;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}
