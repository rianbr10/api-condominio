import { Model, DataTypes } from 'sequelize';
import { db } from '../../../database/db';
import bcrypt from 'bcrypt';
import {generatorUUID} from "../../../utils/generatorUUID";
import Lotes from "../../Lotes/Model/Lotes";

class Boletos extends Model {
    public id!: number | string;
    public uuid!: number | string;
    public nome_sacado!: string;
    public page_number_pdf!: string;
    public id_lote!: string;
    public valor!: number;
    public linha_digitavel!: string;
    public ativo!: boolean;

    public readonly created_at!: Date;
    public readonly updated_at!: Date;

}

Boletos.init(
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
        nome_sacado: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id_lote: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tb_lotes',
                key: 'id'
            }
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
        },
        linha_digitavel: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ativo: {
            type: DataTypes.TINYINT,
            allowNull: true,
        },
        page_number_pdf: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }

    },
    {
        sequelize: db,
        tableName: 'tb_boletos',
        timestamps: true,
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
);

Boletos.beforeCreate(async (boletos: Boletos) => {
    boletos.uuid = boletos.uuid || generatorUUID();
})
Boletos.belongsTo(Lotes, {foreignKey: 'id_lote', as: 'lote', constraints: true})
Lotes.hasMany(Boletos, {foreignKey: 'id_lote', as: 'boletos', constraints: true})

export default Boletos;
