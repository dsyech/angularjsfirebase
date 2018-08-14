var app = angular.module('myApp', ['ngRoute', 'LoginController','BerandaController', 'ProfilController']);
app.config (['$routeProvider', function($routeProvider){

	//Routing App
	$routeProvider
		.when("/login", {
			templateUrl: "templates/login.html",
			controller: "LoginController"
		})
		.when("/beranda", {
			templateUrl: "templates/beranda.html",
			controller: "BerandaController"
		})

		.when("/profil", {
			templateUrl: "templates/profil.html",
			controller: "ProfilController"
		})

		.otherwise({
			redirectTo: "/login"
		});

}])