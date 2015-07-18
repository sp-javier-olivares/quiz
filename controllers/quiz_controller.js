var models = require('../models/models.js');

exports.load = function(req, res, next, quizId) {
	models.Quiz.findById(quizId).then(
		function(quiz){
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quizId));
			}
		}
	);
}

exports.index = function(req, res) {

	var search = "";

	if (req.param('search') !== undefined) {
		search = req.param('search');
	}

	search = "%" + search + "%";

	models.Quiz.findAll({where:["pregunta like ?", search], order: [['pregunta', 'ASC']]}).then(function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes});
	});
}

exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

exports.answer = function(req, res) {
	var resultado = 'Incorrecto';
	
	if (req.query.respuesta === req.quiz.respuesta) {
		resultado = 'Correcto';
	}

	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

exports.autor = function(req, res) {
	res.render('author', {});
};