const PdfPrinter = require('pdfmake');

async function create_pdf_with_info(data = {}) {
	const { contact_id, full_name, email, phone, city, state, country, name } =
		data;

	const fonts = {
		Courier: {
			normal: 'Courier',
			bold: 'Courier-Bold',
			italics: 'Courier-Oblique',
			bolditalics: 'Courier-BoldOblique',
		},
		Helvetica: {
			normal: 'Helvetica',
			bold: 'Helvetica-Bold',
			italics: 'Helvetica-Oblique',
			bolditalics: 'Helvetica-BoldOblique',
		},
		Times: {
			normal: 'Times-Roman',
			bold: 'Times-Bold',
			italics: 'Times-Italic',
			bolditalics: 'Times-BoldItalic',
		},
		Symbol: {
			normal: 'Symbol',
		},
		ZapfDingbats: {
			normal: 'ZapfDingbats',
		},
	};

	const printer = new PdfPrinter(fonts);

	const pdfDefinition = {
		content: [
			`Date: ${new Date().toDateString()}`,
			'\n',
			'\n',
			'\n',
			'\n',
			`I, ${full_name}, affirm that I have submitted my information to ${name} to sign up for, creating the document`,

			'\n',
			'\n',
			'\n',
			'\n',

			`${new Date().toDateString()}`,
			'\n',
			'\n',
			'\n',
			'By answering YES and confirming your information below,',
		],
		defaultStyle: {
			font: 'Times',
			lineHeight: 1.6,
			fontSize: 12,
		},
	};

	var pdfDoc = printer.createPdfKitDocument(pdfDefinition);

	return pdfDoc;
}

module.exports = create_pdf_with_info;
