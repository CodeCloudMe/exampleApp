var house = angular.module('SwatchApp', [])

.controller('SwatchCtrl', function($scope, $http) {
	$http.get('/me?format=json').then(function(resp) {
	console.log('Success', resp);
	// $scope.conditions = resp.data.conditions;
	$scope.user = resp.data.profile;
	 // For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('CoderCtrl', function($scope, $http) {
	$http.get('/coders?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['coders'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('PhotoCtrl', function($scope, $http) {
	$http.get('/photos?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['photos'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('BrowseCtrl', function($scope, $http) {
	$http.get('/browses?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['browses'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('MyAccountCtrl', function($scope, $http) {
	$http.get('/myAccounts?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['myAccounts'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('RecentlyViewedCtrl', function($scope, $http) {
	$http.get('/recentlyVieweds?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['recentlyVieweds'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('DetailCtrl', function($scope, $http) {
	$http.get('/details?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['details'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('SearchCtrl', function($scope, $http) {
	$http.get('/searchs?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['searchs'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('ResultCtrl', function($scope, $http) {
	$http.get('/results?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['results'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('RecentlySearchedCtrl', function($scope, $http) {
	$http.get('/recentlySearcheds?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['recentlySearcheds'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.controller('LearnMoreCtrl', function($scope, $http) {
	$http.get('/learnMores?format=json').then(function(resp) {
	console.log('Success', resp);
	$scope.contents = resp['data']['learnMores'];
	 $scope.contents._currentPage= window.location.href; 
	// For JSON responses, resp.data contains the result
	}, function(err) {
	console.error('ERR', err);
	// err.status will contain the status code
})
})

.config(function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{').endSymbol('}]}');
});
