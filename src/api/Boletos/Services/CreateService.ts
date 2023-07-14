import BoletosRepositore from "../Repository/BoletosRepositore";
interface IBoleto {
    nome_sacado?: string;
    id_lote?: string;
    valor?: string;
    linha_digitavel?: string;
    ativo?: boolean;
}
export default class CreateService {
    public boletosRepository: BoletosRepositore;

    constructor() {
        this.boletosRepository = new BoletosRepositore();
    }

    async execute(data: IBoleto): Promise<Object | null>{
        const boleto = await this.boletosRepository.create({
            nome_sacado: data.nome_sacado,
            id_lote: data.id_lote,
            valor: data.valor,
            linha_digitavel: data.linha_digitavel,
            ativo: data.ativo
        });

        return await this.boletosRepository.findById(boleto.id)
    }

}