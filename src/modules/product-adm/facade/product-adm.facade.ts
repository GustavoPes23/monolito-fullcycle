import type UseCaseInterface from "../../@shared/usecase/use-case.interface";
import ProductAdmFacadeInterface, {
  AddProductFacadeInputDto,
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockUseCase?: UseCaseInterface
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase?: UseCaseInterface;

  constructor(useCasesProps: UseCasesProps) {
    this._addUseCase = useCasesProps.addUseCase;
    this._checkStockUseCase = useCasesProps.stockUseCase;
  }

  addProduct(input: AddProductFacadeInputDto): Promise<void> {
    //caso o dto do caso de uso for diferente do dto da facade, converter o dto da facade para o dto do caso de uso
    return this._addUseCase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    if (!this._checkStockUseCase) {
      return Promise.resolve({ productId: input.productId, stock: 0 });
    }
    return this._checkStockUseCase.execute(input);
  }
}
