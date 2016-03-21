angular.module('starter.services', []).service('contactsService', function($q, $http, $state, APISERVER, accountService) {

	var contacts = [];

	return {

		createNew : function(contact) {
			var transferObject = {};

			transferObject = {};

			transferObject.value = contact;

			console.log(JSON.stringify(transferObject));

			var deferred = $q.defer();

			if (accountService.getAccount().username) {

				var contactsUrl = encodeURI(APISERVER + "/rest/v1.0/customers/" + accountService.getAccount().contractid + "/users/" + accountService.getAccount().id + "/contacts");

				console.log(contactsUrl);

				$http({
					method : "POST",
					url : contactsUrl,
					data : contact
				}).success(function(status) {
					console.log(status);
					deferred.resolve();

				}).error(function(status) {
					console.log(status);
					deferred.reject();
				});

			} else {
				console.log("not logged in, not fetching contacts");
				deferred.reject();
			}

			return deferred.promise;

		},

		getContacts : function() {

			var deferred = $q.defer();

			if (accountService.getAccount().username) {

				var contactsUrl = encodeURI(APISERVER + "/rest/v1.0/customers/" + accountService.getAccount().contractid + "/users/" + accountService.getAccount().id + "/contacts");

				console.log(contactsUrl);

				$http({
					method : "GET",
					url : contactsUrl
				}).success(function(data) {
					contacts = data.value.contactshort;
					deferred.resolve(contacts);

				}).error(function(status, error) {
					console.log(status, error);
					deferred.reject();
				});

			} else {
				console.log("not logged in, not fetching contacts");
				deferred.reject();
			}

			return deferred.promise;
		},

		getContact : function(contactId) {

			var contact;

			if (contacts) {
				angular.forEach(contacts, function(item) {
					if (item.id == contactId) {
						contact = item;
					}
				});
			}

			return contact;
		}

	}
}).service('accountService', function($q, $http, Base64, APISERVER) {

	var account = {};

	return {

		login : function(loginData) {

			var deferred = $q.defer();

			console.log('Doing login', loginData);

			$http.defaults.headers.common['Authorization'] = 'Basic ' + Base64.encode(loginData.contractid + '/' + loginData.username + ':' + loginData.password);

			var loginUrl = encodeURI(APISERVER + "/rest/v1.0/customers/" + loginData.contractid + "/users/" + loginData.username);

			$http({
				method : "GET",
				url : loginUrl

			}).success(function(data) {

				if (data.value && data.value.name) {
					console.log("----USERDATA----");
					console.log(data);
					account.contractid = loginData.contractid;
					account.username = loginData.username;
					account.id = data.value.id;
					deferred.resolve();
				} else {
					alert("Error: Could not login");
				}

			}).error(function(status, error) {
				console.log(status, error);
				alert("Error: Could not login");
			});

			return deferred.promise;

		},

		getAccount : function() {
			return account;
		}

	}
})

.factory('Base64', function() {
	var keyStr = 'ABCDEFGHIJKLMNOP' + 'QRSTUVWXYZabcdef' + 'ghijklmnopqrstuv' + 'wxyz0123456789+/' + '=' + ' ';
	return {
		encode : function(input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;

			do {
				chr1 = input.charCodeAt(i++);
				chr2 = input.charCodeAt(i++);
				chr3 = input.charCodeAt(i++);

				enc1 = chr1 >> 2;
				enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
				enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
				enc4 = chr3 & 63;

				if (isNaN(chr2)) {
					enc3 = enc4 = 64;
				} else if (isNaN(chr3)) {
					enc4 = 64;
				}

				output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";
			} while (i < input.length);

			return output;
		},

		decode : function(input) {
			var output = "";
			var chr1, chr2, chr3 = "";
			var enc1, enc2, enc3, enc4 = "";
			var i = 0;

			// remove all characters that are not A-Z, a-z, 0-9,
			// +, /, or =
			var base64test = /[^A-Za-z0-9\+\/\=]/g;
			if (base64test.exec(input)) {
				alert("There were invalid base64 characters in the input text.\n" + "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" + "Expect errors in decoding.");
			}
			input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

			do {
				enc1 = keyStr.indexOf(input.charAt(i++));
				enc2 = keyStr.indexOf(input.charAt(i++));
				enc3 = keyStr.indexOf(input.charAt(i++));
				enc4 = keyStr.indexOf(input.charAt(i++));

				chr1 = (enc1 << 2) | (enc2 >> 4);
				chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
				chr3 = ((enc3 & 3) << 6) | enc4;

				output = output + String.fromCharCode(chr1);

				if (enc3 != 64) {
					output = output + String.fromCharCode(chr2);
				}
				if (enc4 != 64) {
					output = output + String.fromCharCode(chr3);
				}

				chr1 = chr2 = chr3 = "";
				enc1 = enc2 = enc3 = enc4 = "";

			} while (i < input.length);

			return output;
		}
	};
});
