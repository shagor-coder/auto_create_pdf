const { default: axios } = require('axios');
const FormData = require('form-data');
const stream = require('stream');

async function post_pdf_to_contact(pdfDoc, data = {}) {
	const {
		contact_id,
		full_name,
		email,
		phone,
		city,
		state,
		country,
		name,
		location_id,
		formId,
	} = data;

	let fData = new FormData();

	const eventData = {
		source: '',
		referrer: '',
	};

	const fd = {
		full_name: full_name,
		email: email,
		formId: formId,
		location_id: location_id,
		eventData: eventData,
	};

	let contact;

	const pdfReadableStream = new stream.Readable();
	pdfReadableStream._read = () => {};
	pdfDoc.on('data', (chunk) => pdfReadableStream.push(chunk));
	pdfDoc.on('end', async () => {
		pdfReadableStream.push(null);

		try {
			fData.append('formData', JSON.stringify(fd));
			fData.append('completed_doc', pdfReadableStream, {
				filename: `${full_name}.pdf`,
			});

			let config = {
				method: 'post',
				maxBodyLength: Infinity,
				url: 'https://services.leadconnectorhq.com/forms/submit',
				headers: {
					...fData.getHeaders(),
				},
				data: fData,
			};

			const response = await axios.request(config);
			contact = await response.data;
		} catch (error) {
			contact = error;
		}
	});
	pdfDoc.end();

	return contact;
}

module.exports = post_pdf_to_contact;
