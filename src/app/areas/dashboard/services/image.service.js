/** @ngInject */
function ImageService($http, $q, $rootScope) {
    this.$http = $http;
    this.$q = $q;
    this.$rootScope = $rootScope;
}

ImageService.prototype.loadCurrentImage = function(id) {
    return this.$http.jsonp('https://api.instagram.com/v1/media/' + id
        + '/?access_token=' + this.$rootScope.user.accessToken
        + '&callback=JSON_CALLBACK').then(function(response) { return response.data; });
};

ImageService.prototype.loadCurrentImageComments = function(id) {
    return this.$http.jsonp('https://api.instagram.com/v1/media/' + id
        + '/comments/?access_token=' + this.$rootScope.user.accessToken
        + '&callback=JSON_CALLBACK').then(function(response) { return response.data; });
};

ImageService.prototype.addCommentToCurrentImage = function(id, text) {
    return this.$http.post('https://api.instagram.com/v1/media/' + id
        + '/comments/?access_token=' + this.$rootScope.user.accessToken
        + '&callback=JSON_CALLBACK'
        + '&text=' + text ).then(function(response) { return response.data; });
};

ImageService.prototype.loadImages = function() {
    return this.$http.jsonp('https://api.instagram.com/v1/users/self' +
        '/media/recent/?count=10&access_token=' + this.$rootScope.user.accessToken
            + '&callback=JSON_CALLBACK').then(function(response) { return response.data; });
};

ImageService.prototype.loadMoreImages = function(meta) {
    var defer = this.$q.defer();
    if (this.busy || !meta.next_url) {
        defer.reject();
    } else {
        this.busy = true;
        var url = meta.next_url + '&callback=JSON_CALLBACK', _this = this;

        this.$http.jsonp(url).then(function (response) {
            _this.busy = false;
            defer.resolve(response.data);
        });
    }

    return defer.promise;
};

module.exports = ImageService;
