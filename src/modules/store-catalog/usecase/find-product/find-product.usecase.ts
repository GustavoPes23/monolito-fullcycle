import type ProductGateway from "../../gateway/product.gateway";
import type {
  FindProductInputDto,
  FindProductOutputDto,
} from "./find-product.dto";

export default class FindProductUseCase {
  constructor(private readonly productRepository: ProductGateway) {}

  public async execute(
    input: FindProductInputDto
  ): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id);

    return {
      id: product.id!.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    };
  }
}
