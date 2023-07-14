import { PDFDocument, StandardFonts, PDFPageDrawTextOptions } from 'pdf-lib';
import BoletosRepository from '../Repository/BoletosRepositore';

interface BoletoData {
    nome_sacado: string;
    id_lote: string;
    valor: number;
    linha_digitavel: string;
}

export default class GerarPDFService {
    private boletosRepository: BoletosRepository;

    constructor() {
        this.boletosRepository = new BoletosRepository();
    }

    async execute(): Promise<Object | null> {
        try {
            const boletos = await this.boletosRepository.findAll({});

            // Crie um novo documento PDFtb_lotes
            const pdfDoc = await PDFDocument.create();

            // Adicione uma nova página ao documento
            const page = pdfDoc.addPage();

            // Defina a fonte do texto
            const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

            // Defina o tamanho do texto
            const fontSize = 12;

            // Defina as posições iniciais da tabela
            const x = 50;
            const y = page.getHeight() - 50;

            // Defina as dimensões da tabela
            const tableWidth = 540;
            const tableHeight = boletos.length * 50;

            // Defina o número de colunas da tabela
            const numColumns = 4;

            // Defina o espaçamento entre as células da tabela
            const cellMargin = 10;

            // Desenhe a borda da tabela
            page.drawLine({
                start: { x, y },
                end: { x: x + tableWidth, y },
                thickness: 1,
            });
            page.drawLine({
                start: { x, y },
                end: { x, y: y - tableHeight },
                thickness: 1,
            });
            page.drawLine({
                start: { x: x + tableWidth, y },
                end: { x: x + tableWidth, y: y - tableHeight },
                thickness: 1,
            });

            // Calcule a largura das colunas
            const columnWidth = tableWidth / numColumns;

            // Defina a posição inicial da próxima célula
            let nextCellX = x + cellMargin;
            let nextCellY = y - cellMargin;

            // Escreva os cabeçalhos das colunas
            page.drawText('Nome Sacado', { x: nextCellX, y: nextCellY, font, size: fontSize });
            nextCellX += columnWidth;

            page.drawText('ID Lote', { x: nextCellX, y: nextCellY, font, size: fontSize });
            nextCellX += columnWidth;

            page.drawText('Valor', { x: nextCellX, y: nextCellY, font, size: fontSize });
            nextCellX += columnWidth;

            page.drawText('Linha Digitável', { x: nextCellX, y: nextCellY, font, size: fontSize });
            nextCellX += columnWidth;

            // Defina a posição inicial da próxima célula (segunda linha)
            nextCellX = x + cellMargin;
            nextCellY -= cellMargin * 2;

            // Escreva os dados dos boletos na tabela
            for (const boleto of boletos) {
                page.drawText(boleto.nome_sacado, { x: nextCellX, y: nextCellY, font, size: fontSize });
                nextCellX += columnWidth;

                page.drawText(`${boleto.id_lote}`, { x: nextCellX, y: nextCellY, font, size: fontSize });
                nextCellX += columnWidth;

                page.drawText(boleto.valor.toString(), { x: nextCellX, y: nextCellY, font, size: fontSize });
                nextCellX += columnWidth;

                page.drawText(boleto.linha_digitavel, { x: nextCellX, y: nextCellY, font, size: fontSize });
                nextCellX += columnWidth;

                nextCellX = x + cellMargin;
                nextCellY -= cellMargin * 2;
            }

            // Salve o documento PDF em formato base64
            const pdfBytes = await pdfDoc.save();

            return {
                base64: Buffer.from(pdfBytes).toString('base64'),
            }
        } catch (error) {
            console.error(error);
            throw new Error('Error generating PDF');
        }
    }
}
