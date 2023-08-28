function get_webhook_data(req, res) {
	const {
		contact_id,
		full_name,
		email,
		phone,
		city,
		state,
		country,
		location,
		customData,
	} = req.body;
	const { name, id: location_id } = location;
	const { formId } = customData;

	return {
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
	};
}
module.exports = get_webhook_data;
