angular.module('BornDigitalApp').controller('PidController', ['$scope', '$http', '$location', '$window', '$state', '$stateParams', function($scope, $http, $location, $window, $state, $stateParams) {
	$scope.data = null;
	
	$scope.data = $stateParams.data.data;
	$scope.pid = $stateParams.data.data[0].pid;
}]);