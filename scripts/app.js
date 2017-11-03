(function(){

	var app = angular.module('GiphySearchApp',[]);
	
	app.controller("SearchController",SearchController);
	app.service("SearchService", SearchService);
	app.filter("output", OutputFilterFactory);
	app.directive('onLoadAnimate', function($timeout){
		return {
			restrict: 'A',
			link: function($scope, $element, attrs){
				$element.addClass("hide-giph");
				$element.on('load', function() {
					$element.addClass("show-giph");
				});
			}
		};
	})



	function OutputFilterFactory(){
		return function(obj){
			return "";
		}
	}

	SearchService.$inject = ["$http", "$q"];

	function SearchService($http, $q){

		var service = this;
		
		service.API_KEY = "o8iXar9Zr6Piyol9G66ZO3WNtlS8DUT0";
		service.RATING = "pg";

		service.searchGifs = function(searchTerm){
			var response = $http({
				method: 'GET',
				url: 'https://api.giphy.com/v1/gifs/search?api_key=' + service.API_KEY + "&q=" + searchTerm + "&rating=" + service.RATING
			});
			return response;
		}

	}

	SearchController.$inject = ["$scope", "$filter", "SearchService", "outputFilter"];
	
	function SearchController($scope, $filter, SearchService){

		$scope.searchService = SearchService;
		$scope.giphyList = [];
		$scope.loadingDiv = false;

		$scope.searchGiphs = function(){
			$scope.giphyList = [];
			$scope.loadingDiv = true;
			var response = $scope.searchService.searchGifs($scope.searchTerm);
			response.then(function(response){
				$scope.giphyList = response.data.data;
				$scope.loadingDiv = false;
			});
		};

	}



})();

