var express = require('express');
var router = express.Router();
var quizControllers = require('../controllers/quiz_controller.js');
var commentControllers = require('../controllers/comment_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' , errors: []});
});

router.param('quizId', quizControllers.load); // autoload :quizId

router.get('/quizes', quizControllers.index);
router.get('/search', quizControllers.index);
router.get('/quizes/new', quizControllers.new);
router.post('/quizes/create', quizControllers.create);
router.get('/quizes/:quizId(\\d+)', quizControllers.show);
router.get('/quizes/:quizId(\\d+)/answer', quizControllers.answer);
router.get('/quizes/:quizId(\\d+)/edit', quizControllers.edit);
router.put('/quizes/:quizId(\\d+)', quizControllers.update);
router.delete('/quizes/:quizId(\\d+)', quizControllers.destroy);
router.get('/author', quizControllers.autor);

router.get('/quizes/:quizId(\\d+)/comments/new', commentControllers.new);
router.post('/quizes/:quizId(\\d+)/comments', commentControllers.create);

module.exports = router;
