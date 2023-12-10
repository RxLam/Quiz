import {Column, DataType, Model, Table, ForeignKey, HasMany, BelongsTo} from "sequelize-typescript";
import {Questions} from "../questions/questions.model";

interface VariantsCreationAttrs {
    variants: string[];
    correct: number;
    questionId: number
}


@Table({tableName: 'variants13'})
export class Variants extends Model<VariantsCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.ARRAY(DataType.STRING), unique: false, allowNull: true})
    variants: string[]

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    correct: number

    @BelongsTo(() => Questions)
    questions: Questions;

    @ForeignKey(() => Questions)
    @Column({type: DataType.INTEGER, allowNull: false, primaryKey: false})
    questionId: number
}