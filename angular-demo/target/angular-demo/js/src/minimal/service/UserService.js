/**
 * Created by halapro on 2016/3/12.
 */
'use strict';
var httpHeaders =  {'Content-Type': 'application/x-www-form-urlencoded'};
angular.module('userFactoryCtrl', [])
    .factory('userFactory', ['$http', '$q', function($http, $q) {
        var service = {};
        service.save = function(postData) {
            var def = $q.defer();
            $http({
                method: 'POST',
                url: '',
                headers: httpHeaders,
                data: postData
            }).success(function(data) {
                def.resolve(data);
            }).error(function() {
                def.reject('There was an error');
            });
            return def.promise;
        };
    }]);