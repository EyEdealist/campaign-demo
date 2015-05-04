(function(angular) {
    'use strict';

    angular
        .module('campaignDemoApp', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/static.html',
                    controller: 'StaticCampaignController'
                })
                .when('/live', {
                    templateUrl: 'views/live.html',
                    controller: 'LiveCampaignController'
                });
        })
        .controller('StaticCampaignController', function($scope, $http) {
            $scope.pages = [];
            $scope.types = ['Letter', 'Signup', 'Petition'];
            $scope.filter = [];
            $scope.error = null;

            /**
             * Fetches pages, filtered by options type
             *
             * @returns {$q}
             */
            $scope.fetch = function() {
                var options = {
                    url: '/pages',
                    method: 'GET'
                };

                if($scope.filter.length > 0) {
                    options.params = { type: $scope.filter.join(',') };
                }

                return $http(options).then(
                    function(res) {
                        $scope.error = null;
                        $scope.pages = res.data;
                    },
                    function(res) {
                        $scope.error = res;
                    }
                );
            };

            /**
             * Toggles type to filter by
             *
             * @param {String} type - Page type
             */
            $scope.toggleType = function(type) {
                var index = $scope.filter.indexOf(type);

                if(index !== -1) {
                    $scope.filter.splice(index, 1);
                } else {
                    $scope.filter.push(type);
                }

                $scope.fetch();
            };

            /**
             * Checks if type is selected
             *
             * @param {String} type - Page type
             * @returns {boolean}
             */
            $scope.isSelected = function(type) {
                return ($scope.filter.indexOf(type) !== -1);
            };

            $scope.fetch();
        })
        .controller('LiveCampaignController', function($scope, $http) {
            $scope.pages = [];
            $scope.count = 20;
            $scope.types = ['Letter', 'Signup', 'Petition'];
            $scope.filter = [];
            $scope.loading = false;
            $scope.error = null;

            /**
             * Fetches pages, filtered by options type
             *
             * @returns {$q}
             */
            $scope.fetch = function() {
                var options = {
                    url: '/pages-live',
                    method: 'GET',
                    params: {
                        count: $scope.count
                    }
                };

                $scope.loading = true;

                return $http(options)
                    .then(
                        function(res) {
                            $scope.error = null;
                            $scope.pages = res.data;
                        },
                        function(res) {
                            $scope.error = res;
                        }
                    ).finally(function() {
                        $scope.loading = false;
                    }
                );
            };

            /**
             * Toggles type to filter by
             *
             * @param {String} type - Page type
             */
            $scope.toggleType = function(type) {
                var index = $scope.filter.indexOf(type);

                if(index !== -1) {
                    $scope.filter.splice(index, 1);
                } else {
                    $scope.filter.push(type);
                }
            };

            /**
             * Checks if type is selected
             *
             * @param {String} type - Page type
             * @returns {boolean}
             */
            $scope.isSelected = function(type) {
                return ($scope.filter.indexOf(type) !== -1);
            };

            /**
             * Filters pages by type
             *
             * @param {String} page - Page type
             * @returns {boolean}
             */
            $scope.filterByType = function(page) {
                return $scope.filter.length === 0 || $scope.isSelected(page.type);
            };

            $scope.fetch();
        });


})(angular);
