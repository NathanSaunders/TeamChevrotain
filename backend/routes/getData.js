const Documents = require('../models/Documents');

module.exports = router => {
	router.get('/getData', (req, res) => {
		Documents.find((err, data) => {
			if (err)
				return res.json({
					success: false,
					error: err
				});
			return res.json({
				success: true,
				data: data
			});
		});
	});
};
