(function(){

	//First set up the essentials
	var app = angular.module('GiphySearchApp',[]);
	app.controller("SearchController",SearchController);
	app.service("SearchService", SearchService);
	app.filter("output", OutputFilterFactory);

	//Create animation on image load
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



	//If we want to enhance with some filtering we can. Not for now.
	function OutputFilterFactory(){
		return function(obj){
			return "";
		}
	}

	//Handle the messy business logic in a service
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

	//Create the controller for the Giphy Search
	SearchController.$inject = ["$scope", "$filter", "SearchService"];
	function SearchController($scope, $filter, SearchService){

		$scope.searchService = SearchService;
		$scope.giphyList = [];
		$scope.loadingDiv = false;

		$scope.formOverride = function(ele){
			$scope.giphyList = [];
			$scope.loadingDiv = true;
			var response = $scope.searchService.searchGifs($scope.searchTerm);
			response.then(function(response){
				$scope.giphyList = response.data.data;
				$scope.loadingDiv = false;
			});
		};
	}

})();	//Wrap inside an IIFE

