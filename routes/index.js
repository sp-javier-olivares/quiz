var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller.js');
var commentControllers = require('../controllers/comment_controller.js');
var sessionControllers = require('../controllers/session_controller.js');

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
router.get('/quizes/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quizes/:quizId(\\d+)/comments', commentControllers.create);

module.exports = router;
