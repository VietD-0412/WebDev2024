// Refresh Token for User to request new token when expires
import {Model, BelongsTo, Column, DataType, ForeignKey, Table} from "sequelize-typescript";
import {User} from "./user.model";

@Table({ tableName: 'refresh_token', underscored: true })
class RefreshToken extends Model {
    @Column(DataType.STRING)
    token!: string;

    @ForeignKey(() => User)
    userID!: number;

    @BelongsTo(() => User)
    user!: User;
}

export { RefreshToken };