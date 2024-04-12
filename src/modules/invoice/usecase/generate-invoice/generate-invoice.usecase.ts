import type InvoiceGateway from "../../gateway/invoice.gateway";
import type { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice.usecase.dto";

import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../../invoice-items/domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";

import Address from "../../value-object/address";

export default class GenerateInvoiceUseCase {
  private _repository: InvoiceGateway;

  constructor(repository: InvoiceGateway) {
    this._repository = repository;
  }

  async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
    const address = new Address({
      street: input.street,
      number: input.number,
      complement: input.complement,
      city: input.city,
      state: input.state,
      zipCode: input.zipCode,
    });

    const invoiceItems = input.items.map((item) => new InvoiceItems({
      id: new Id(String(item.id)),
      name: item.name,
      price: item.price,
    }));

    const props = {
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      address,
      items: invoiceItems,
    };

    const invoice = new Invoice(props);
    this._repository.generate(invoice);

    const total = invoice.total();

    return {
      id: invoice.id!.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((item) => ({
        id: item.id!.id,
        name: item.name,
        price: item.price
      })),
      total
    };
  }
}
