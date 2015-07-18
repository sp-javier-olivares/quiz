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

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));
exports.Quiz = Quiz;

var createQuiz = function(pregunta, respuesta) {
	return {pregunta: pregunta, respuesta: respuesta};
}

var quizesArray = [];
var quizNumber = 0;
quizesArray[quizNumber++] = createQuiz('Capital de Italia', 'Roma');
quizesArray[quizNumber++] = createQuiz('Capital de Portugal', 'Lisboa');
quizesArray[quizNumber++] = createQuiz('Capital de España', 'Madrid');
quizesArray[quizNumber++] = createQuiz('Capital de Francia', 'París');

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

sequelize.sync().then(function(){
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
});