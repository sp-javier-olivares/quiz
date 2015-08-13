var express = require('express');
var router = express.Router();
var controllers = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' , errors: []});
});

router.param('quizId', controllers.load); // autoload :quizId

router.get('/quizes', controllers.index);
router.get('/search', controllers.index);
router.get('/quizes/new', controllers.new);
router.post('/quizes/create', controllers.create);
router.get('/quizes/:quizId(\\d+)', controllers.show);
router.get('/quizes/:quizId(\\d+)/answer', controllers.answer);
router.get('/quizes/:quizId(\\d+)/edit', controllers.edit);
router.put('/quizes/:quizId(\\d+)', controllers.update);
router.get('/author', controllers.autor);

module.exports = router;
