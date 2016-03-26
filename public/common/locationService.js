angular.module('app').service('locationService', [function() {

    var _this = this;
    this.previousLocation = null;

    this.changeLocation = function (from, to) {
        if (from && to) {
            _this.previousLocation = from;
            document.location = to;
        }
        else if (_this.previousLocation) {
            document.location = _this.previousLocation;
            _this.previousLocation = null;
        }
    };

    this.restoreLocation = function () {
        if (_this.previousLocation) {
            document.location = _this.previousLocation;
            _this.previousLocation = null;
        }
    };

}]);