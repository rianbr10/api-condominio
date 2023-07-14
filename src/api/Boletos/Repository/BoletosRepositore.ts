import Boletos from "../Model/Boletos";
import {Op} from "sequelize";

interface IBoleto {
    nome_sacado?: string;
    id_lote?: string;
    valor?: string;
    linha_digitavel?: string;
    ativo?: boolean;
}

interface IQueries {
    nome?: string;
    valor_inicial?: string;
    valor_final?: string;
    id_lote?: string;
}

export default class BoletosRepositore {
    async create({nome_sacado, id_lote, valor, linha_digitavel, ativo}: IBoleto) {
        return await Boletos.create({nome_sacado, id_lote, valor, linha_digitavel, ativo})
    }

    async findAll({nome, id_lote, valor_inicial, valor_final}: IQueries) {
        let where: any = {}
        if (nome) {
            where.nome_sacado = {
                [Op.like]: `%${nome}%`
            }
        }
        if (id_lote) {
            where.id_lote = id_lote
        }
        if (valor_inicial && valor_final) {
            where.valor = {
                [Op.between]: [valor_inicial, valor_final]
            }
        }
        return await Boletos.findAll({
            where,
            include: [
                {
                    association: 'lote',
                }
            ]
        })
    }

    async findById(id_boleto: any) {
        return Boletos.findByPk(id_boleto)
    }
    
    async findByNomeSacado(nome_sacado: string) {
        return Boletos.findOne({where: {nome_sacado}})
    }

}
