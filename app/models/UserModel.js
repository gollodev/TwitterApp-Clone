var mongoose = require('mongoose'),
	Schema 	 = mongoose.Schema;

// Moongose Connect DB
mongoose.connect('mongodb://127.0.0.1/twDB');
var db = mongoose.connection;

// Events Moongose Connection
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  	console.log('Connected!');
});

db.on('close', function () {
	console.log('Close Connection!');
});

var UserSchema = new Schema ({
	 _id          : Number,
     token        : String,
     displayName  : String,
     username     : String
});

module.exports = mongoose.model('User', UserSchema);