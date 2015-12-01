angular.module('reddit')

.controller('newArticlesController', ['$scope', 'apiService', '$state', function($scope, apiService, $state) {

  $scope.createArticle = function() {
    apiService.create($scope.article);
    $state.go('articles');
  }

}]);