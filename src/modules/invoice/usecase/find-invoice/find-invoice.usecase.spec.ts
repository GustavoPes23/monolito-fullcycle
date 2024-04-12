import Id from "../../../@shared/domain/value-object/id.value-object";
import InvoiceItems from "../../../invoice-items/domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import Address from "../../value-object/address";
import FindInvoiceUseCase from "./find-invoice.usecase";

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

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  };
};

describe("Find invoice usecase unit test", () => {
  it("should find a invoice", async () => {
    const repository = MockRepository();
    const usecase = new FindInvoiceUseCase(repository);

    const input = { id: "1" };
    const result = await usecase.execute(input);

    expect(repository.find).toHaveBeenCalled();
    expect(result.id).toBe(invoice.id!.id);
    expect(result.name).toBe(invoice.name);
    expect(result.document).toBe(invoice.document);
    expect(result.address.street).toBe(invoice.address.street);
    expect(result.address.number).toBe(invoice.address.number);
    expect(result.address.complement).toBe(invoice.address.complement);
    expect(result.address.city).toBe(invoice.address.city);
    expect(result.address.state).toBe(invoice.address.state);
    expect(result.address.zipCode).toBe(invoice.address.zipCode);
    expect(result.items[0].id).toBe(invoiceItems.id!.id);
    expect(result.items[0].name).toBe(invoiceItems.name);
    expect(result.items[0].price).toBe(invoiceItems.price);
    expect(result.total).toBe(invoice.total());
    expect(result.createdAt).toBe(invoice.createdAt);
  });
});
