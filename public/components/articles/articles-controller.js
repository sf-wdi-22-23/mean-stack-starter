angular.module('reddit')

.controller('articlesController', ['$scope', 'apiService', function($scope, apiService) {

  apiService.index()
  .then(function(articles) {
    $scope.articles = articles;
  });

}]);