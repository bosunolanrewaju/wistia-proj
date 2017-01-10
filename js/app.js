'use strict';

angular.module('WistiaVideoUploader', [])
  .component('fileUploader', {
    templateUrl: 'file-uploader.html',
    bindings: {
      file: '='
    },
    controller: function($window) {
      var $ = $window.jQuery;
      $('#fileupload').fileupload({
        url: 'https://upload.wistia.com/',
        limitMultiFileUploads: 1,
        acceptFileTypes: '/^video/i',
        dataType: 'json',
        formData: function() {
          return [
            { name: "api_password", value: "26fa8deda50570ab7efa9f9703741554cd2d10b076d1b29fdb0092a7f2ead382" },
            { name: "project_id", value: "v2vsbu45l9" }
          ];
        },
        done: function (e, data) {

        },
        progress: function (e, data) {
          // var progress = parseInt(data.loaded / data.total * 100, 10);
          // console.log(progress);
        }
      });
    }
  });
