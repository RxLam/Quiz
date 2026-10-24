import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UsersCreationAttrs {
    username: string;
    password: string;
    email: string;
    birthDate: string;
    scores: number;
}


@Table({tableName: 'users1'})
export class User extends Model<UsersCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    username: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, unique: false, allowNull: false})
    birthDate: string;

    @Column({type: DataType.INTEGER, unique: false, allowNull: true})
    scores: number;
}