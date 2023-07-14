import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import BoletosRepository from '../Repository/BoletosRepositore';

export default class ExtrairPagesService {
    private boletosRepository: BoletosRepository;

    constructor() {
        this.boletosRepository = new BoletosRepository();
    }

    async execute(file: Express.Multer.File): Promise<Object | null> {
        try {
            const boletos = await this.boletosRepository.findAll({}); // Obtenha os dados da tabela "boletos" do seu banco de dados
            // Carregue o arquivo PDF
            const pdfDoc = await PDFDocument.load(file.buffer);

            // Itere sobre os dados da tabela "boletos"
            for (const boleto of boletos) {
                const sacadoId = boleto.id; // ID do sacado
                const pageNumber = parseInt(boleto.page_number_pdf); // Número da página do PDF

                // Verifique se o número da página é válido
                if (pageNumber >= 0 && pageNumber < pdfDoc.getPageCount()) {
                    const extractedPdf = await PDFDocument.create();
                    const [copiedPage] = await extractedPdf.copyPages(pdfDoc, [pageNumber]);
                    extractedPdf.addPage(copiedPage);
                    
                    // Salve o novo documento PDF com base no ID do sacado
                    const extractedPdfPath = `./output/${sacadoId}.pdf`;
                    const extractedPdfBytes = await extractedPdf.save();
                    fs.writeFileSync(extractedPdfPath, extractedPdfBytes);
                }
            }

            return { message: 'Paginas extraidas com sucesso' };
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao extrair paginas');
        }
    }
}
