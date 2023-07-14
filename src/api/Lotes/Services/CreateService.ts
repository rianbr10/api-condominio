import LotesRepository from "../Repository/LotesRepositore";
interface ILotes {
    nome: string;
    ativo?: boolean;
}
export default class CreateService {
    public lotesRepository: LotesRepository;
    
    constructor() {
        this.lotesRepository = new LotesRepository();
    }
    
    async execute(data: ILotes): Promise<Object | null>{
        const lote = await this.lotesRepository.create({
            nome: data.nome,
            ativo: data.ativo
        });

        return await this.lotesRepository.findById(lote.id)
    }

}