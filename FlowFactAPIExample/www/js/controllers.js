angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $state, $ionicModal, $timeout, accountService) {
	// Form data for the login modal
	$scope.loginData = {
		contractid : "323323",
		username : "Klaus Erfolg",
		password : ""
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		accountService.login($scope.loginData).then(function(successful) {
			$state.go("app.contacts", {}, {
				reload : true
			});
		});

	};
})

.controller('contactsCtrl', function($scope, $ionicModal, contactsService, contacts) {
	$scope.contacts = contacts;

	$scope.newcontact = {};

	$ionicModal.fromTemplateUrl('templates/new-contact.html', {
		scope : $scope,
		animation : 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal
	})

	$scope.$on('$destroy', function() {
		$scope.modal.remove();
	});

	$scope.newContact = function() {
		$scope.modal.show();
	}

	$scope.doRefresh = function() {
		console.log("refreshing");
		contactsService.getContacts().then(function(contacts) {
			console.log("List refreshed");
			$scope.contacts = contacts;
			$scope.$broadcast('scroll.refreshComplete');
		})
	}

	$scope.saveAndCloseModal = function() {
		contactsService.createNew($scope.newcontact).then(function() {
			console.log("Contact saved");
			$scope.doRefresh();
		});
		$scope.newcontact = {};
		$scope.modal.hide();
	}

})

.controller('contactCtrl', function($scope, $state, contact) {

	// prevents stateless view. Todo: handle this better
	if (!contact) {
		$state.go("app.contacts", {}, {
			reload : true
		});
	}

	$scope.contact = contact;

});
