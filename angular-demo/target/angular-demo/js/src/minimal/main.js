/**
 * Created by baozun on 2016/3/11.
 */
'use strict'
var mainApp = angular.module("mainApp", ['ngAnimate', 'ui.router', 'userFactoryCtrl']);
mainApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {

    //$urlRouterProvider.when('/', '/index');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'template/minimal/index.html',
            controller: 'mainCtrl'
        })
        .state('userList', {
            url: '/userList',
            templateUrl: 'template/minimal/userList.html',
            controller: 'userListCtrl'
        });

    if(window.history && history.pushState) {
        $locationProvider.html5Mode(true);
    }
}]);