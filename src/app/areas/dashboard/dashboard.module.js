var DashboardController = require('./controllers/dashboard.controller');
var SelectedImageController = require('./controllers/selectedImage.controller');
var ImageService = require('./services/image.service');

module.exports =
    angular.module('dashboard', [])
        .config(function($stateProvider) {
            $stateProvider
                .state('dashboard',{
                    url: '/dashboard',
                    template: require('./templates/dashboard.html'),
                    controller: 'DashboardController',
                    controllerAs: 'ctrl'
                })
                .state('dashboard.selectedImage',{
                    url: '/{id}',
                    template: require('./templates/selectedImage.html'),
                    controller: 'SelectedImageController',
                    controllerAs: 'ctrl'
                })
        })
        .service('ImageService', ImageService)
        .controller('DashboardController', DashboardController)
        .controller('SelectedImageController', SelectedImageController).name;
