import { Sequelize } from "sequelize-typescript";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

describe("Client adm facade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUseCase,
      findUseCase: undefined,
    });

    const input = {
      id: "1",
      name: "Client 1",
      email: "client1@email",
      address: "Client 1 address",
    };

    await facade.add(input);

    const client = await ClientModel.findOne({ where: { id: "1" } });

    expect(client).toBeDefined();
    expect(client!.dataValues.id).toBe(input.id);
    expect(client!.dataValues.name).toBe(input.name);
    expect(client!.dataValues.email).toBe(input.email);
    expect(client!.dataValues.address).toBe(input.address);
  });

  it("should find a client", async () => {
    const repository = new ClientRepository();
    const findUseCase = new FindClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUseCase: undefined,
      findUseCase,
    });

    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "client1@email",
      address: "Client 1 address",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await facade.find({
      id: "1",
    });

    expect(result.id).toBe(client.dataValues.id);
    expect(result.name).toBe(client.dataValues.name);
    expect(result.email).toBe(client.dataValues.email);
    expect(result.address).toBe(client.dataValues.address);
    expect(result.createdAt).toStrictEqual(client.dataValues.createdAt);
    expect(result.updatedAt).toStrictEqual(client.dataValues.updatedAt);
  });
});
