// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [ 'ionic', 'starter.controllers', 'starter.services' ])

// FFAPI Requires CORS Proxy
// .constant("APISERVER",
// "https://flowfactapi.flowfact.com/com.flowfact.server/api")
.constant("APISERVER", "http://localhost:8100/com.flowfact.server/api")

.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		// Hide the accessory bar by default (remove this to show the accessory
		// bar above the keyboard
		// for form inputs)
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			// org.apache.cordova.statusbar required
			StatusBar.styleDefault();
		}
	});
})

.run(function($rootScope, $state) {

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
		console.log("State Change: Error!");
		$state.go("app.login");
	});

})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url : "/app",
		abstract : true,
		templateUrl : "templates/menu.html",
		controller : 'AppCtrl'
	}).state('app.login', {
		url : "/login",
		views : {
			'menuContent' : {
				templateUrl : "templates/login.html",
				controller : 'AppCtrl',
				cache : false,
			}
		}
	}).state('app.contacts', {
		url : "/contacts",
		views : {
			'menuContent' : {
				templateUrl : "templates/contacts.html",
				controller : 'contactsCtrl',
				cache : false,
				resolve : {
					contacts : function($stateParams, contactsService) {
						return contactsService.getContacts()
					}
				}
			}
		}
	}).state('app.contact', {
		url : "/contacts/:contactId",
		views : {
			'menuContent' : {
				templateUrl : "templates/contact.html",
				controller : 'contactCtrl',
				resolve : {
					contact : function($stateParams, contactsService) {
						return contactsService.getContact($stateParams.contactId)
					}
				}
			}
		}
	});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/login');
});
