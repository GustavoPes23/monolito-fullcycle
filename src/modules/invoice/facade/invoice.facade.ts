import type UseCaseInterface from "../../@shared/usecase/use-case.interface";
import type InvoiceFacadeInterface from "./invoice.facade.interface";
import type { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
  createUseCase?: UseCaseInterface;
  findUseCase?: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUseCase?: UseCaseInterface;
  private _createUseCase?: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._createUseCase = useCaseProps.createUseCase;
    this._findUseCase = useCaseProps.findUseCase;
  }

  public async create(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    return await this._createUseCase!.execute(input);
  }

  public async find(
    input: FindInvoiceFacadeInputDTO
  ): Promise<FindInvoiceFacadeOutputDTO> {
    return await this._findUseCase!.execute(input);
  }
}