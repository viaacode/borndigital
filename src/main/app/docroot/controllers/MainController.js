angular.module('BornDigitalApp').controller('MainController', ['$scope', '$http', '$location', '$window', '$state', function($scope, $http, $location, $window, $state) {
	$scope.data = null;
	$scope.count = 0;
	$scope.pid = "";
	$scope.outcome = "";
	$scope.cp = "";
	$scope.orderByField = '';
	$scope.reverseSort = false;
	$scope.page = 0;
	$scope.prevPage = 0
	$scope.fromDate = '';
	$scope.toDate = '';
	$scope.parent = {};
	
	$scope.getTimes = function(n){
	     return new Array(n);
	};
	
	$scope.range = function (page, pages) {
	    var ret = [];
	    start = 0;
	    if (page+2 <= pages) {
	      end = page + 2;
	    }
	   else {
	     end = pages;
	   }
	   if (page-3 > 0) {
	     start = page -3;
	   }
	   for (var i = start; i < end; i++) {
	      if (i < end) {
	        ret.push(i);
	     }

	   }
	return ret;
	};
	
	$scope.changePage = function(index) {
		$scope.prevPage = $scope.page;
		if (index <= 0) {
			//Index below 0!
			$scope.page = 0;
		}
		else if (index > $scope.count - 1) {
			//Index above max # of pages!
			$scope.page = $scope.count - 1;
		}
		else {
			$scope.page = index;
		}
		console.log($scope.page);
		if ($scope.page != $scope.prevPage) {
			//Page actually changed. Re-request data
			$scope.performQuery();
		}
	};
	
	$scope.prevDisabled = function() {
		if ($scope.page <= 0) {
			return true;
		} else {
			return false;
		}
	};
	
	$scope.nextDisabled = function() {
		if ($scope.page >= $scope.count - 1) {
			return true;
		} else {
			return false;
		}
	};
	
	$scope.plusPage = function() {
		$scope.changePage($scope.page + 1);
	};
	
	$scope.minPage = function() {
		$scope.changePage($scope.page - 1);
	};
	
	$scope.getSinglePid = function(pid) {
		$http({
			method: 'GET',
			url: '/pid',
			params: {
				pid: pid
			}
		}).then(function successCallback(response) {
			$state.go('pid', { data: response });
		},
		function errorCallback(response) {
			alert('Error occurred.');
		});
	};
	
	$scope.performQuery = function() {
		console.log('From date: ' + $scope.parent.fromDate);
		console.log('To date: ' + $scope.parent.toDate);
		
		$http({
			method: 'GET',
			url: '/search',
			params: {
				start: ($scope.page * 20),
				pid: $scope.pid,
				outcome: $scope.outcome,
				cp: $scope.cp,
				orderByField: $scope.orderByField,
				reverseSort: $scope.reverseSort,
				fromDate: $scope.parent.fromDate == null ? "" : $scope.parent.fromDate.toString(),
				toDate: $scope.parent.toDate == null ? "" : $scope.parent.toDate.toString()
			}
		}).then(function successCallback(response) {
			$scope.data = response.data.data;
			$scope.count = roundNumber(parseInt(response.data.totalCount) / 20);
		}, 
		function errorCallback(response) {
			alert('Error occurred.');
		});
	};
	
	$scope.$on('dateFromUpdated', function(event, data) {
		$scope.parent.fromDate = data;
		$scope.performQuery();
	});
	
	$scope.$on('dateToUpdated', function(event, data) {
		$scope.parent.toDate = data;
		$scope.performQuery();
	});
	
	function roundNumber(i) {
		return Math.ceil(i);
	};
	
	$('#datefrom').pickadate({
	    selectMonths: true,
	    selectYears: 5,
	    onSet: function (context) {
	        var x,y,year,date,month;
	        x = this.get().toString();
	        y = x.split(/[-]+/);
	        year = y[0];
	        month = y[1];
	        date = y[2];
	        if(date && month && year){
		        $scope.$broadcast('dateFromUpdated', x)
	    	}
	    },
	    onClose: function(){
	        $(document.activeElement).blur();
	    },
	    closeOnClear: true,
	    format: 'yyyy-mm-dd',
	    formatSubmit: 'yyyy-mm-ddT00:00:00.000Z',
	});
	
	$('#dateto').pickadate({
	    selectMonths: true,
	    selectYears: 5,
	    onSet: function (context) {
	        var x,y,year,date,month;
	        x = this.get().toString();
	        y = x.split(/[-]+/);
	        year = y[0];
	        month = y[1];
	        date = y[2];
	        
	        //Hack to add 1 day, Mule can't work with a SQL query adding 1 day ('2016-03-03'::date + '1 day'::interval)
	        //Dates are stored as DateTime in the database. 2016-03-03 will become: 2016-03-03 00:00:00 so it the query will return results excluding this date
	        var tempDate = new Date(x);
	        console.log('Original date: ' + tempDate);
	        tempDate = tempDate.addDays(1);
			var day = tempDate.getDate();
			var monthIndex = tempDate.getMonth();
			var year = tempDate.getFullYear();
	        var parsedDate = (year + '-' + month + '-' + day)
	        
	        if(day && month && year){
		        $scope.$broadcast('dateToUpdated', parsedDate)
	    	}
	    },
	    onClose: function(){
	        $(document.activeElement).blur();
	    },
	    closeOnClear: true,
	    format: 'yyyy-mm-dd',
	    formatSubmit: 'yyyy-mm-ddT00:00:00.000Z',
	});
	
	Date.prototype.addDays = function(days) {
        this.setDate(this.getDate() + days);
        return this;
    };
	

	$scope.performQuery();
	
}]);