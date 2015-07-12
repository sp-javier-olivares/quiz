var express = require('express');
var router = express.Router();
var controllers = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.param('quizId', controllers.load); // autoload :quizId

router.get('/quizes', controllers.index);
router.get('/quizes/:quizId(\\d+)', controllers.show);
router.get('/quizes/:quizId(\\d+)/answer', controllers.answer);

router.get('/author', controllers.autor);

module.exports = router;
