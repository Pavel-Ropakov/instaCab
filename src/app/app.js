require('angular-loading-bar/build/loading-bar.css');
require('./app.scss');
require('font-awesome/css/font-awesome.css');
require('bootstrap-social/bootstrap-social.css');

var cookies  = require('angular-cookies');
var uirouter = require('angular-ui-router');
var progress = require('angular-loading-bar');
require('ng-infinite-scroll');

var login = require('./areas/login/login.module');
var dashboard = require('./areas/dashboard/dashboard.module');

var app = angular.module('image-dashboard', [progress, uirouter, cookies, 'infinite-scroll', login, dashboard]);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise(function($injector, $location) {
        var params, path = $location.$$path;
        if (~path.indexOf('access_token')) {
            params = {accessToken: path.split('=')[1]};
        }

        $injector.get('$state').go('login', params);
    });

    cfpLoadingBarProvider.includeSpinner = false;
});

app.run(function($rootScope, $state, $timeout, $cookies) {
    var AUTH_COOKIE_NAME = '__auth_user__';
    if (!$rootScope.user) {
        $rootScope.user = $cookies.getObject(AUTH_COOKIE_NAME);
    } else {
        $cookies.putObject(AUTH_COOKIE_NAME, $rootScope.user);
    }

    angular.extend($rootScope, {
        logout: function() {
            delete $rootScope.user;
            $cookies.remove(AUTH_COOKIE_NAME);
            $state.go('login');
        },

        storeToken: function(token) {
            $rootScope.user = {accessToken: token};
            $cookies.putObject(AUTH_COOKIE_NAME, $rootScope.user);
        }
    });

    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (!~['login'].indexOf(toState.name)) {
            $timeout(function() {
                $state.go($rootScope.user ? toState.name : 'login');
            })
        } else if (toState.name === 'login' && $rootScope.user) {
            $state.go('dashboard');
        }
    });
});
