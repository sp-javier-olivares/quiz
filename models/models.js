var path = require('path');

//DATABASE_URL = postgres://user:passwd@host:port/database
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6] || null);
var user = (url[2] || null);
var pwd = (url[3] || null);
var protocol = (url[1] || null);
var dialect = (url[1] || null);
var port = (url[5] || null);
var host = (url[4] || null);
var storage = process.env.DATABASE_STORAGE;

var Sequelize = require('sequelize');
var sequelize = new Sequelize(DB_name, user, pwd,
						{
							dialect: protocol,
							protocol: protocol,
							port: port,
							host: host,
							storage: storage,
							omitNull: true
						}
					);

/******************************/
/******* Quiz *****************/
/******************************/

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));

var createQuiz = function(pregunta, respuesta, tema) {
	return {pregunta: pregunta, respuesta: respuesta, tema: tema};
}

var quizesArray = [];
var quizNumber = 0;
quizesArray[quizNumber++] = createQuiz('Capital de Italia', 'Roma', 'Geografía');
quizesArray[quizNumber++] = createQuiz('Capital de Portugal', 'Lisboa', 'Geografía');
quizesArray[quizNumber++] = createQuiz('Capital de España', 'Madrid', 'Geografía');
quizesArray[quizNumber++] = createQuiz('Capital de Francia', 'París', 'Geografía');

var createData = function() {
	for (index = 0; index < quizNumber; ++index) {
		if (index === (quizNumber - 1)) {
			Quiz.create(quizesArray[index]).then(function(){console.log('Base de datos inicializada')});
		} else {
			Quiz.create(quizesArray[index]);
		}
	}
};

var refreshData = function(result){
	for (index = 0; index < result.length; ++index) {
		if (index === (result.length - 1)) {
			result[index].destroy().then(createData());
		} else {
			result[index].destroy();
		}
	}
};

/******************************/
/******* Comments *************/
/******************************/

var Comment = sequelize.import(path.join(__dirname, 'comment'));

Comment.belongsTo(Quiz);
Quiz.hasMany(Comment);




/******************************/
/******* Initialize ***********/
/******************************/

exports.Quiz = Quiz;
exports.Comment = Comment;

sequelize.sync({force: true}).then(function(){

	Quiz.count().then(function(amount) {

		console.log("count: " + amount + "; array: " + quizesArray.length);

		if (amount < quizesArray.length) {

			Quiz.findAll().then(function(result){

				if (result.length > 0)
				{
					refreshData(result);
				}
				else
				{
					createData();
				}
			});
		}
	});
});