import csvParser from 'csv-parser';
import { Readable } from 'stream';
import BoletosRepository from "../Repository/BoletosRepositore";
import LotesRepositore from "../../Lotes/Repository/LotesRepositore";

export default class GetAllService {
    public boletosRepository: BoletosRepository;
    public loteRepository: LotesRepositore;

    constructor() {
        this.boletosRepository = new BoletosRepository();
        this.loteRepository = new LotesRepositore();
    }

    async execute(file: Express.Multer.File): Promise<Object | null> {
        const results: any[] = [];

        return new Promise((resolve, reject) => {
            const stream = Readable.from(file.buffer); // Cria uma stream de leitura a partir do buffer

            stream
                .pipe(csvParser())
                .on('data', (data) => {
                    results.push(data);
                })
                .on('end', async () => {
                    try {
                        const transformedData = results.map((data) => {
                            const csvData = data['nome;unidade;valor;linha_digitavel'].split(';');
                            return {
                                nome: csvData[0],
                                unidade: csvData[1],
                                valor: csvData[2],
                                linha_digitavel: csvData[3]
                            };
                        });
                        for (const data of transformedData) {
                            const unidade = await this.loteRepository.findByUnidadeCsv(data.unidade);
                            if (unidade) {
                                await this.boletosRepository.create({
                                    nome_sacado: data.nome,
                                    valor: data.valor,
                                    linha_digitavel: data.linha_digitavel,
                                    id_lote: unidade.id,
                                    ativo: true,
                                });
                            }
                        }
                        resolve({ message: 'CSV importado com sucesso' });
                    } catch (error) {
                        reject({ error: 'Falha ao importar CSV' });
                    }
                })
                .on('error', (error) => {
                    reject({ error: 'Falha ao importar CSV' });
                });
        });
    }
}
