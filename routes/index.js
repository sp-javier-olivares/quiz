var express = require('express');
var router = express.Router();
var controllers = require('../controllers/quiz_controller.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

router.get('/quizes/question', controllers.question);
router.get('/quizes/answer', controllers.answer);
router.get('/author', controllers.autor);

module.exports = router;
