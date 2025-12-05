import { PDFDocument } from 'pdf-lib';

export async function generatePdf(html) {
  const pdfDoc = await PDFDocument.create();

  const page = pdfDoc.addPage([595, 842]); // A4
  const { width } = page.getSize();

  // простой рендер текста (no html layout)
  page.drawText(html.replace(/<[^>]*>/g, ''), {
    x: 40,
    y: 780,
    size: 12,
    maxWidth: width - 80
  });

  return await pdfDoc.save();
}
