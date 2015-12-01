angular.module('reddit')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider

    .state('articles', {
      url: '/',
      templateUrl: '../components/articles/articles-view.html',
      controller: 'articlesController'
    })

    .state('new', {
      url: '/new',
      templateUrl: '../components/article-form/article-form-view.html',
      controller: 'newArticlesController'
    });

    // catchall
   $urlRouterProvider.otherwise('/');

}]);