// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '122153478327039', // your App ID
		'clientSecret' 	: 'a2c887c63a4aa1f2973bc2b89de0605a', // your App Secret
		'profileFields': [ 'emails'],
		'callbackURL' 	: 'http://localhost:8090/auth/facebook/callback',
		'passReqToCallback' : true
	},

	'twitterAuth' : {
		'consumerKey' 		: 'your-consumer-key-here',
		'consumerSecret' 	: 'your-client-secret-here',
		'callbackURL' 		: 'http://localhost:8090/auth/twitter/callback'
	},

	'googleAuth' : {
			'clientID' 		: '865756533627-7b6dcc9esis3j3gr1lnuaviscqhkp5pu.apps.googleusercontent.com',
			'clientSecret' 	: 'ixm4JS_1u5Va8gSEHev2bSN0',
			'callbackURL' 	: 'http://localhost:8090/auth/google/callback'
		}
};
