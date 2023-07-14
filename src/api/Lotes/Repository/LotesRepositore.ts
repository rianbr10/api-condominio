import Lotes from "../Model/Lotes";
import {Op} from "sequelize";

interface ILotes {
    nome: string;
    ativo?: boolean;
}

export default class LotesRepository {
    async create({nome, ativo}: ILotes) {
        return await Lotes.create({nome, ativo})
    }

    async findAll() {
        return await Lotes.findAll({
            include: [
                {
                    association: 'boletos'
                }
            ]
        })
    }

    async getByName(nome: string) {
        return await Lotes.findOne({where: {nome}})
    }

    async findById(id: number) {
        return Lotes.findByPk(id, {
            include: [
                {
                    association: 'boletos'
                }
            ]
        })
    }

    async findByUnidadeCsv(unidade: string) {
        return await Lotes.findOne({
            where: {
                nome: {
                    [Op.like]: `%${unidade}%`
                }
            }
        })
    }
}
