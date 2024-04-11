import PaymentFacade from "../facade/payment.facade";
import type PaymentFacadeInterface from "../facade/payment.facade.interface";
import TransactionRepository from "../repository/transaction.repository";
import ProcessPaymentUseCase from "../usecase/process-payment/process-payment.usecase";

export default class PaymentFacadeFactory {
  public static create(): PaymentFacadeInterface {
    const transactionRepository = new TransactionRepository();
    const useCase = new ProcessPaymentUseCase(transactionRepository);

    return new PaymentFacade(useCase);
  }
}
