var app = angular.module('BornDigitalApp', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/',
            templateUrl: 'partials/partial-home.html',
            controller: 'MainController'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('pid', {
            url: '/pid',
            templateUrl: 'partials/partial-pid.html',
            params: {
            	data: {}
            },
            controller: 'PidController'
        });
        
});