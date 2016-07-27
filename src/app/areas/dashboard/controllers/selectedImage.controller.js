/** @ngInject */
function SelectedImageController($http, ImageService, $state, $scope) {
    this.$http = $http;
    this.$state = $state;
    this.images = [];
    this.ImageService = ImageService;
    this.imgId = $state.params.id;
    this.allImages = $scope.$parent.ctrl.imagesIds;
    this.disableNext = false;
    this.disablePrev = false;

    this.activate();
}

SelectedImageController.prototype.activate = function() {
    var _this = this;
    if(this.imgId){
        this.ImageService.loadCurrentImage(this.imgId).then(function(response) {
            _this.imageInfo = response.data;
            var currentImgIndex = _this.allImages.indexOf(_this.imgId);
            if(currentImgIndex === 0) {
                _this.disablePrev = true;
            }
            if(currentImgIndex == -1) {
                _this.disableNext = true;
            }
        });
        this.ImageService.loadCurrentImageComments(this.imgId).then(function(response) {
            _this.imageComments = response.data;
        });
    }
};

SelectedImageController.prototype.addComment = function() {
    var _this = this;
    var text = this.newCommentText;
    if(text){
        this.ImageService.addCommentToCurrentImage(this.imgId, text).then(function(response) {
            _this.imageComments.push(response.data);
        });

    }
};

SelectedImageController.prototype.loadPrev = function() {
    var imgIndex = this.allImages.indexOf(this.imgId);
    this.$state.go('dashboard.selectedImage', {id: this.allImages[imgIndex-1]});
};

SelectedImageController.prototype.loadNext = function() {
    var imgIndex = this.allImages.indexOf(this.imgId);
    this.$state.go('dashboard.selectedImage', {id: this.allImages[imgIndex+1]});
};

module.exports = SelectedImageController;
