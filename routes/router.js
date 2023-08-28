const get_webhook_data = require('../middlewares/get_webhook_data');
const create_pdf_with_info = require('../utils/create_pdf_with_info');
const post_pdf_to_contact = require('../utils/post_pdf_to_contact');

const Router = require('express').Router;

const router = Router();

router.post('/create', async (request, response) => {
	const formattedData = get_webhook_data(request);
	const pdfDoc = await create_pdf_with_info(formattedData);
	const posted = await post_pdf_to_contact(pdfDoc, formattedData);
	console.log(posted);
	response.send('Created');
});

module.exports = router;
