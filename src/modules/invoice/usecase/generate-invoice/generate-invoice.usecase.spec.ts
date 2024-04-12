import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice usecase unit test", () => {
  it("should add a invoice", async () => {
    const repository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(repository);

    const input = {
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

    const result = await usecase.execute(input);

    expect(repository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.street).toBe(input.street);
    expect(result.number).toBe(input.number);
    expect(result.complement).toBe(input.complement);
    expect(result.city).toBe(input.city);
    expect(result.state).toBe(input.state);
    expect(result.zipCode).toBe(input.zipCode);
    expect(result.items.length).toBe(input.items.length);
    expect(result.total).toBe(100);
  });
});
