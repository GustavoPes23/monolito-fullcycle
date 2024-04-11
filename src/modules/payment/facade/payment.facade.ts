import type UseCaseInterface from "../../@shared/usecase/use-case.interface";
import type PaymentFacadeInterface from "./payment.facade.interface";
import type {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from "./payment.facade.interface";

export default class PaymentFacade implements PaymentFacadeInterface {
  constructor(private processPaymentUseCase: UseCaseInterface) {}

  public async process(
    input: PaymentFacadeInputDto
  ): Promise<PaymentFacadeOutputDto> {
    return await this.processPaymentUseCase.execute(input);
  }
}
