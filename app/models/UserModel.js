var mongoose = require('mongoose');
var	Schema 	 = mongoose.Schema;

mongoose.connect('mongodb://127.0.0.1:3000/twDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (conn) {
  	console.log('Connected! ' + conn);
});

var UserSchema = new Schema ({
	 id           : String,
     token        : String,
     displayName  : String,
     username     : String
});

module.exports = mongoose.model('User', UserSchema);