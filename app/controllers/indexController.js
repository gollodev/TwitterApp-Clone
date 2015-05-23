
var indexController = function (req, res) {
	res.render('index', {
		title: 'Twitter Clone with Nodejs',
		welcome: 'Welcome Cool User! ;)'
	});
};

module.exports = indexController;
