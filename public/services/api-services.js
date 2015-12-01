angular.module('reddit')

.factory('apiService', ['$http', function($http) {
  return {
    index: function() {
      return $http.get('/api/articles')
      .then(function(response) {
        var articles = response.data;
        console.log('articles:',articles)
        return articles
      });
    },
    create: function(article) {
      $http.post('/api/articles', article);
    }
  }
}]);