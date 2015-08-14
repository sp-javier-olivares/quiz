var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller.js');
var commentControllers = require('../controllers/comment_controller.js');
var sessionControllers = require('../controllers/session_controller.js');


router.use(function(req, res, next) {

	if (req.session.user) {
		if (typeof req.session.lastTransaction !== "undefined") {
			var diff = new Date((new Date).getTime() - req.session.lastTransaction);
			console.log("La ultima vez que he entrado fue hace: " + diff.getSeconds());

			if (diff.getSeconds() > 10) {
				delete req.session.lastTransaction;
				sessionControllers.logout(req, res);
				next();
				return;
			}
		}
		req.session.lastTransaction = (new Date()).getTime();
		next();
	} else {
		next();
	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' , errors: []});
});

// sesion
router.get('/login', sessionControllers.new);
router.post('/login', sessionControllers.create);
router.get('/logout', sessionControllers.destroy);

// quizes
router.param('quizId', quizControllers.load); // autoload :quizId
router.get('/quizes', quizControllers.index);
router.get('/search', quizControllers.index);
router.get('/quizes/new', sessionControllers.loginRequired, quizControllers.new);
router.post('/quizes/create', sessionControllers.loginRequired, quizControllers.create);
router.get('/quizes/:quizId(\\d+)', quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quizes/:quizId(\\d+)/edit', sessionControllers.loginRequired, quizControllers.edit);
router.put('/quizes/:quizId(\\d+)', sessionControllers.loginRequired, quizControllers.update);
router.delete('/quizes/:quizId(\\d+)', sessionControllers.loginRequired, quizControllers.destroy);
router.get('/author', quizControllers.autor);

// comentarios
router.param('commentId', commentControllers.load);
router.get('/quizes/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quizes/:quizId(\\d+)/comments', commentControllers.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionControllers.loginRequired, commentControllers.publish);

module.exports = router;
