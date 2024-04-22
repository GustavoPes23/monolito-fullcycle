import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Product from "../domain/product.entity";
import Client from "../domain/client.entity";

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({
    allowNull: false,
  })
  id!: string;

  @Column({
    allowNull: true,
  })
  invoiceId!: string;

  @Column({
    allowNull: false,
  })
  status!: string;

  @Column({
    allowNull: false,
  })
  client!: string;

  @Column({
    allowNull: false,
  })
  products!: string;
}
