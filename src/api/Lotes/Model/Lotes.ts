import { Model, DataTypes } from 'sequelize';
import { db } from '../../../database/db';
import {generatorUUID} from "../../../utils/generatorUUID";

class Lotes extends Model {
    public id!: any;
    public uuid!: any;
    public nome!: string;
    public ativo!: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

}

Lotes.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uuid: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING
        },
        ativo: {
            type: DataTypes.TINYINT
        },
    },
    {
        sequelize: db,
        tableName: 'tb_lotes',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
);

Lotes.beforeCreate(async (lotes: Lotes) => {
    lotes.uuid = lotes.uuid || generatorUUID();
})

export default Lotes;
