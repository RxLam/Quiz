import {Column, DataType, Model, Table, HasOne, HasMany, ForeignKey, BelongsTo, BelongsToMany} from "sequelize-typescript";
import {Categories} from "../categories/categories.model";
import {Variants} from "../variants/variants.model";

interface QuestionsCreationAttrs {
    questions: string[];
    categoryId: number;
}


@Table({tableName: 'questions13'})
export class Questions extends Model<QuestionsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.ARRAY(DataType.STRING), unique: false, allowNull: true})
    questions: string[];

    @BelongsTo(() => Categories)
    categories: Categories

    @ForeignKey(() => Categories)
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: false})
    categoryId: number

    @HasMany(() => Variants, {onDelete: 'cascade', hooks: true})
    variants: Variants[]
}