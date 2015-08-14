exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

exports.new = function(req, res) {

	var errors = typeof req.session.errors === 'undefined'? [] : req.session.errors;
	req.session.errors = [];
	
	res.render('sessions/new', {errors: errors});
};

exports.create = function(req, res) {

	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user){

		if (error) {
			req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
			res.redirect("/login");
			return;
		}

		req.session.user = {id: user.id, username: user.username};
		res.redirect(req.session.redir.toString());
	});
};

var logout = function(req, res) {
	console.log("destruyo session");
	delete req.session.user;
}

exports.logout = logout;

exports.destroy = function(req, res) {
	logout(req, res);
	res.redirect(req.session.redir.toString());
};