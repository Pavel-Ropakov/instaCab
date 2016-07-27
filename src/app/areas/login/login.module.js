var LoginController = require('./controllers/login.controller');

module.exports =
    angular.module('login', [])
        .config(function($stateProvider) {
            $stateProvider.state('login', {
                url: '/login/:accessToken?',
                template: require('./templates/login.html'),
                controller: 'LoginController',
                controllerAs: 'ctrl',
                resolve: {
                    accessToken: function($stateParams) {
                        return $stateParams.accessToken
                    }
                }
            });
        })
        .controller('LoginController', LoginController).name;
