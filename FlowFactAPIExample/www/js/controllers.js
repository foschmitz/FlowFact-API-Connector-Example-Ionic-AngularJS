angular.module('starter.controllers', [])

.controller('AppCtrl',
		function($scope, $state, $ionicModal, $timeout, accountService) {
			// Form data for the login modal
			$scope.loginData = {
				contractid : "322322",
				username : "Klaus Erfolg",
				password : "123456"
			};

			// Perform the login action when the user submits the login form
			$scope.doLogin = function() {
				accountService.login($scope.loginData).then(function(successful){
					console.log("promise returned true");
					$state.go("app.contacts", {}, {
						reload : true
					});
				});
				
			};
		})

.controller('contactsCtrl', function($scope, contacts) {
	console.log("go to controller");
	$scope.contacts = contacts;
	console.log($scope.contacts.length);
})

.controller('contactCtrl', function($scope, contact) {
	$scope.contact = contact;

});
