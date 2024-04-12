import type UseCaseInterface from "../../@shared/usecase/use-case.interface";
import type InvoiceFacadeInterface from "./invoice.facade.interface";
import type { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
  generateUseCase?: UseCaseInterface;
  findUseCase?: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase?: UseCaseInterface;
  private _generateUseCase?: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._generateUseCase = useCaseProps.generateUseCase;
    this._findUseCase = useCaseProps.findUseCase;
  }

  public async generate(input: GenerateInvoiceFacadeInputDto): Promise<void> {
    await this._generateUseCase!.execute(input);
  }

  public async find(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._findUseCase!.execute(input);
  }
}