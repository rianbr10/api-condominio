import BoletosRepositore from "../Repository/BoletosRepositore";
import GerarPDFService from "./GerarPDFService";
import GerarRelatorioService from "./GerarRelatorioService";

interface IQueries {
    nome?: string;
    valor_inicial?: string;
    valor_final?: string;
    relatorio?: string;
    id_lote?: string;
}

export default class GetAllService {
    public boletosRepository: BoletosRepositore;
    public gerarPDFService: GerarPDFService;
    public gerarRelatorioService: GerarRelatorioService;

    constructor() {
        this.boletosRepository = new BoletosRepositore();
        this.gerarPDFService = new GerarPDFService();
        this.gerarRelatorioService = new GerarRelatorioService();
    }

    async execute(queries: IQueries): Promise<Object | null>{
        if (queries.relatorio) {
            await this.gerarRelatorioService.execute()
            return await this.gerarPDFService.execute()
        }
        
        return await this.boletosRepository.findAll(queries)
    }

}