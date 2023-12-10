import {Column, DataType, Model, Table, ForeignKey, HasMany} from "sequelize-typescript";
import {Questions} from '../questions/questions.model'

interface CategoriesCreationAttrs {
    name: string;
}

@Table({tableName: 'categories13'})
export class Categories extends Model<CategoriesCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: false, allowNull: true})
    name: string;

    @HasMany(() => Questions, {onDelete: 'cascade', hooks: true})
    questions: Questions[]
}