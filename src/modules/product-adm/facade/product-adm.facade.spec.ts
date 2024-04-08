import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "../repository/product.model";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import ProductAdmFacade from "./product-adm.facade";
import ProductAdmFacadeFactory from "../factory/facade.factory";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

describe("Product adm facade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        // const productRepository = new ProductRepository();
        // const addProductUseCase = new AddProductUseCase(productRepository);
        // const productFacade = new ProductAdmFacade({
        //     addUseCase: addProductUseCase,
        //     stockUseCase: undefined,
        // });

        // const input = {
        //     id: "1",
        //     name: "Product 1",
        //     description: "Product 1 description",
        //     purchasePrice: 100,
        //     stock: 10
        // };

        // await productFacade.addProduct(input);

        // const product = await productRepository.find("1");

        // expect(product.id!.id).toBe(input.id);
        // expect(product.name).toBe(input.name);
        // expect(product.description).toBe(input.description);
        // expect(product.purchasePrice).toBe(input.purchasePrice);
        // expect(product.stock).toBe(input.stock);

        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10
        };

        await productFacade.addProduct(input);

        const product = await ProductModel.findOne({ where: { id: "1" } });

        expect(product).toBeDefined();
        expect(product?.dataValues.id).toBe(input.id);
        expect(product?.dataValues.name).toBe(input.name);
        expect(product?.dataValues.description).toBe(input.description);
        expect(product?.dataValues.purchasePrice).toBe(input.purchasePrice);
        expect(product?.dataValues.stock).toBe(input.stock);
    });

    it("should check stock of a product", async () => {
        const productFacade = ProductAdmFacadeFactory.create();

        const input = {
            id: "1",
            name: "Product 1",
            description: "Product 1 description",
            purchasePrice: 100,
            stock: 10
        };

        await productFacade.addProduct(input);

        const result = await productFacade.checkStock({
            productId: "1"
        });

        expect(result.stock).toBe(10);
        expect(result.productId).toBe("1");
    });
});