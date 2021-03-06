var passportStub = require('passport-stub');
var app = require('../../app.js');
var models = require('../../models');
var _und = require("underscore")._;

module.exports.createTestAuthUrl = function(account_type, id, token, email, name, role) {
    return ('/auth/test/callback?account_type=' + account_type + '&id=' + id + '&token=' + token + '&email=' + email + '&name=' + name + '&password=test' + '&role=' + role).split(' ').join('+');
}

module.exports.createLogoutUrl = function() {
    return '/logout';
}

module.exports.resetEnvironment = function(a) {
	return models.sequelize.sync({ force: true }).then(function () {
		passportStub.uninstall(a);
		passportStub.install(a);
		passportStub.logout();
	});
}

module.exports.authenticateTestUser = function() {
	var testUser = {
		account_type: "test",
		id: "12345678",
		token: "test_token",
		email: "test@email.com",
		name: "Test Name",
		role: "author"
	};

	return models.User.count().then(function(result) {
		testUser.id += result;
		return models.User.create(testUser).then(function(user) {
			if (!user) throw error("User wasn't created");
			testUser.awesome_id = user.awesome_id;
			testUser.username = "testusername";
			passportStub.login(testUser);
			return user;
		});
	});
}

module.exports.unauthenticateTestUser = function() {
	passportStub.logout();
}

module.exports.waitForElement = function (element) {
    browser.wait(function () {
        return element.isPresent();
    },5000);
    browser.wait(function () {
        return element.isDisplayed();
    },5000);
    return element;
};

module.exports.validDescriptor = {
    "version" : "0.1",
    "questions": [
    	{
		    "question": "binHexOctDec",
		    "repeat": 4,
		    "parameters": {
		    	"conversions": [
		    		{ radix: {from:2,to:8}, range:{min:1, max:1024} },
		    		{ radix: {from:8,to:2}, range:{min:1, max:1024} },
		    		{ radix: {from:2,to:16}, range:{min:1, max:1024} },
		    		{ radix: {from:16,to:2}, range:{min:1, max:1024} }
		    	]
		    }
		},
    	{
		    "question": "changeOfBase",
		    "repeat": 2,
		}
	]
};

module.exports.getSampleQuizDescriptor = function() {
	var qd = _und.clone(module.exports.validDescriptor);
	return qd;
}


module.exports.insertQuizDescriptor = function(m, title) {
	if (!title)
		title = 'Sample Quiz Descriptor';
	return m.QuizDescriptor.create( 
		{ descriptor : module.exports.getSampleQuizDescriptor(), title: title }
	);
}

module.exports.validDescriptorString = JSON.stringify(module.exports.validDescriptor);





