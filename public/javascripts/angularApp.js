var app = angular.module('flapperNews', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl',
      })
      .state(
        'posts', {
          url: '/posts/{id}', // id as parameter
          templateUrl: '/posts.html',
          controller: 'PostsCtrl',
        }
      );

    // Redirect unspecified routes
    $urlRouterProvider.otherwise('home');
  }]);

app.factory('posts', [function () {
  var o = {
    posts: [],
  };

  return o;
},]);


// Post Controller injects posts service
app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function ($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];
    console.log(posts);
    $scope.addComment = function () {
      if ($scope.body === '') {
        return;
      }

      $scope.post.comments.push({
        body: $scope.body,
        author: 'user',
        upvotes: 0,
      });
      $scope.body = '';
    };

    // Upvotes incrememter
    $scope.incrementUpvotes = function (post) { // parameter is current post by reference
      post.upvotes += 1;

      // Shows two-way data-bind as updates to scope are reflected in posts
      // console.log(posts.posts);
    };

  },
]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function ($scope, posts) {
    // $scope.test = 'Hello world!';

    // $scope variable exposes controller variables and functions to templates
    $scope.posts = posts.posts;

    $scope.addPost = function () {
      if (!$scope.title || $scope.title === '') {
        //console.log('Empty bruv!');
        return;
      }

      // Setup dummy comments
      /*$scope.posts.push({
       title: $scope.title,
       link: $scope.link,
       upvotes: 0,
       comments: [
       { author: 'Joe', body: 'Cool post!', upvotes: 0 },
       { author: 'Bob', body: 'great idea but everything is wrong!', upvotes: 0 },
       ],
       });
       */

      $scope.posts.push({ title: $scope.title, link: $scope.link, upvotes: 0, comments: [] });
      $scope.title = '';
      $scope.link = '';
    };

    // Upvotes incrememter
    $scope.incrementUpvotes = function (post) { // parameter is current post by reference
      post.upvotes += 1;

      // Shows two-way data-bind as updates to scope are reflected in posts
      // console.log(posts.posts);
    };
  }]);/**
 * Created by orizu on 08/08/2016.
 */
