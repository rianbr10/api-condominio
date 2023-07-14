import fs from 'fs';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import BoletosRepository from '../Repository/BoletosRepositore';

export default class GerarRelatorioService {
    private boletosRepository: BoletosRepository;

    constructor() {
        this.boletosRepository = new BoletosRepository();
    }

    async execute(): Promise<Object | null> {
        try {
            const boletos = await this.boletosRepository.findAll({});

            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage();

            const { width, height } = page.getSize();
            const margin = 50;
            const fontSize = 12;
            const lineHeight = fontSize * 1.5;

            const title = 'Relatório de Boletos';
            const textLines = [
                'ID | Nome Sacado         | ID Lote | Valor   | Linha Digitável',
                '--------------------------------------------------------------',
            ];

            for (const boleto of boletos) {
                const line = `${boleto.id.toString().padEnd(3)} | ${boleto.nome_sacado.padEnd(20)} | ${boleto.id_lote.toString().padEnd(7)} | ${boleto.valor.toString().padEnd(7)} | ${boleto.linha_digitavel}`;
                textLines.push(line);
            }

            page.drawText(title, {
                x: margin,
                y: height - margin,
                size: fontSize + 8,
                font: await pdfDoc.embedFont(StandardFonts.HelveticaBold),
                color: rgb(0, 0, 0),
            });

            let y = height - margin - lineHeight - 20;

            for (const textLine of textLines) {
                page.drawText(textLine, {
                    x: margin,
                    y,
                    size: fontSize,
                    font: await pdfDoc.embedFont(StandardFonts.Helvetica),
                    color: rgb(0, 0, 0),
                });
                y -= lineHeight;
            }

            const pdfBytes = await pdfDoc.save();

            const relatorioPath = `./output/relatorio.pdf`;
            fs.writeFileSync(relatorioPath, pdfBytes);

            return { message: 'Relatório gerado com sucesso', filePath: relatorioPath };
        } catch (error) {
            console.error(error);
            throw new Error('Erro ao gerar o relatório');
        }
    }
}
