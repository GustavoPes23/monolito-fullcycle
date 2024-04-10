import type UseCaseInterface from "../../@shared/usecase/use-case.interface";
import type ClientAdmFacadeInterface from "./client-adm.facade.interface";
import type {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from "./client-adm.facade.interface";

export interface UseCaseProps {
  addUseCase?: UseCaseInterface;
  findUseCase?: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _findUseCase?: UseCaseInterface;
  private _addUseCase?: UseCaseInterface;

  constructor(useCaseProps: UseCaseProps) {
    this._addUseCase = useCaseProps.addUseCase;
    this._findUseCase = useCaseProps.findUseCase;
  }

  public async add(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCase!.execute(input);
  }

  public async find(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUseCase!.execute(input);
  }
}
