import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";

export default interface InvoiceItemsInterface extends AggregateRoot {
    get id(): Id | undefined;
    get name(): string;
    get price(): number;
}