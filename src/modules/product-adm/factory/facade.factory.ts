import ProductAdmFacade from "../facade/product-adm.facade";
import ProductRepository from "../repository/product.repository";
import AddProductUseCase from "../usecase/add-product/add-product.usecase";
import CheckStockUseCase from "../usecase/check-stock/check-stock.usecase";

//Com factory não tem como evitar ficar com acoplado, entretanto evitar quem for utilizar a facade implementar o repository e o usecase
export default class ProductAdmFacadeFactory {
    static create() {
        const productRepository = new ProductRepository();
        const addProductUseCase = new AddProductUseCase(productRepository);
        const checkStockUseCase = new CheckStockUseCase(productRepository);

        return new ProductAdmFacade({
            addUseCase: addProductUseCase,
            stockUseCase: checkStockUseCase
        });
    }
}