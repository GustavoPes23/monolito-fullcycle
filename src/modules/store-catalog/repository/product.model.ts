import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
    modelName: "products-store-catalog-table",
    tableName: "products-adm",
    timestamps: false
})
export default class ProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id!: string;

    @Column({ allowNull: false })
    name!: string;

    @Column({ allowNull: false })
    description!: string;

    @Column({ allowNull: false })
    salesPrice!: number;
}