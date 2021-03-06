(() => {
	'use strict';

	angular
			.module("myApp")
			.config(config)
			.run(run)

	function config($firebaseRefProvider) {
		console.log('config function started');

		// Initialize Firebase
		const CONFIG = {
			apiKey:            "AIzaSyDsp_oBM8lPOnEGVnByjsofGw7Kpftzfe8",
			authDomain:        "pionear-d070e.firebaseapp.com",
			databaseURL:       "https://pionear-d070e.firebaseio.com",
			storageBucket:     "pionear-d070e.appspot.com",
			messagingSenderId: "96740586251"
		};
		firebase.initializeApp(CONFIG);

		$firebaseRefProvider.registerUrl({
			default: CONFIG.databaseURL,
			users:   `${CONFIG.databaseURL}/users`
		});

	}

	function run(Auth, $rootScope, $location, $state) {
		console.log('run function started');
		checkAuth();

		$rootScope.$on('$routeChangeStart', (next, current) => {
			checkAuth();
		});

		$rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
			// We can catch the error thrown when the $requireSignIn promise is rejected
			// and redirect the user back to the home page
			if(error === "AUTH_REQUIRED") {
				$state.go("home");
			}
		});

		function checkAuth() {
			Auth.$onAuthStateChanged(user => {
				if(!user) $location.path('/auth/sign-in');
				console.log('run(): ' + user);
			});
		}

	};

})();