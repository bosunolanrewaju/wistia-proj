'use strict';

angular.module('WistiaVideoUploader', [])
  .service('FetchVideo', function($q, $window, $rootScope) {
    return {
      url: function() {
        var defer = $q.defer();

        $window.jQuery('#fileupload').fileupload({
          url: 'https://upload.wistia.com/',
          limitMultiFileUploads: 1,
          dataType: 'json',
          formData: function() {
            return [
              { name: "api_password", value: "26fa8deda50570ab7efa9f9703741554cd2d10b076d1b29fdb0092a7f2ead382" },
              { name: "project_id", value: "l7vkvrsv04" }
            ];
          },
          done: function (e, data) {
            var url = "http://fast.wistia.net/embed/iframe/" + data.result.hashed_id;
            defer.resolve(url);
          },
          progress: function (e, data) {
            $rootScope.progress = parseInt(data.loaded / data.total * 100, 10);
          }
        });

        return defer.promise;
      }
    }
  })
  .component('fileUploader', {
    templateUrl: 'file-uploader.html',
    bindings: {
      progress: '<'
    },
    controller: function($window, FetchVideo, $rootScope) {
      var ctrl = this;

      FetchVideo.url().then(function(url) {
        ctrl.videoLink = url;
        ctrl.hasVideo = true;
      });
    }
  })
  .component('videoPlayer', {
    template: "<iframe width='640' height='480' ng-if='$ctrl.hasvideo' ng-src='{{$ctrl.url}}'></iframe>",
    bindings: {
      video: '@',
      hasvideo: '@'
    },
    controller: function($sce) {
      this.$onChanges = function() {
        this.url = $sce.trustAsResourceUrl(this.video);
      }
    }
  });
