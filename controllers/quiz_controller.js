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
		search = req.param('search').replace(" ", "%");
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

exports.new = function(req, res) {

	var newQuiz = models.Quiz.build({pregunta: "Pregunta", respuesta: "Respuesta"});

	res.render('quizes/new', {quiz: newQuiz});
};

exports.create = function(req, res) {

	console.log("Parametros de llegada : " + req.body.quiz);
	var newQuiz = models.Quiz.build({pregunta: req.body.quiz.pregunta, respuesta: req.body.quiz.respuesta});
	
	newQuiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes');
	});
};

exports.autor = function(req, res) {
	res.render('author', {});
};