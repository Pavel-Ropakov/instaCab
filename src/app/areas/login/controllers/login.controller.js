/** @ngInject */
function LoginController($http, $rootScope, $state, accessToken) {
    this.$http = $http;
    this.clientId = '';
    if (accessToken) {
        $rootScope.storeToken(accessToken);
        $state.go('dashboard');
    }
}

LoginController.prototype.authenticate = function() {
    if(this.clientId){
        var appHref = 'http://localhost:8000';
        window.location.href = 'https://api.instagram.com/oauth/authorize/' +
            '?client_id=' + this.clientId + '&redirect_uri=' + appHref + '&response_type=token&scope=public_content+comments';
    }
};

module.exports = LoginController;
