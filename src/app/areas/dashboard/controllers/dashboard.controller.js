/** @ngInject */
function DashboardController($http, ImageService) {
    this.$http = $http;
    this.images = [];
    this.imagesIds = [];
    this.ImageService = ImageService;

    this.activate()
}

DashboardController.prototype.activate = function() {
    var _this = this;
    this.ImageService.loadImages().then(function(response) {
        _this.mediaData = response;
        _this.images = _this.images.concat(response.data);
        var newImgIds = _.map(response.data, 'id');
        _this.imagesIds = _this.imagesIds.concat(newImgIds);
    });
};

DashboardController.prototype.loadMore = function(media) {
    var _this = this;
    if (!media || !media.pagination) return;

    this.ImageService.loadMoreImages(media.pagination).then(function (response) {
        _this.images = _this.images.concat(response.data);
        _this.mediaData = response;
    });
};

module.exports = DashboardController;
