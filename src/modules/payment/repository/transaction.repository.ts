import type PaymentGateway from "../gateway/payment.gateway";

import Transaction from "../domain/transaction";
import TransactionModel from "./transaction.model";

export default class TransactionRepository implements PaymentGateway {
    public async save(input: Transaction): Promise<Transaction> {
        await TransactionModel.create({
            id: input.id!.id,
            amount: input.amount,
            orderId: input.orderId,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        });

        return new Transaction({
            id: input.id,
            amount: input.amount,
            orderId: input.orderId,
            status: input.status,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt
        });
    }    
}