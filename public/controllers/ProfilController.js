var app = angular.module('ProfilController', ['firebase']);

app.controller ('ProfilController', function($scope, $firebaseObject){
	$scope.id = localStorage.getItem('id');
	console.log($scope.id);

		//cek login
		$scope.user;
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				$scope.user = user;
			} else {
				$location.url("/login");
				$scope.$apply(); //solution from : https://stackoverflow.com/questions/11784656/angularjs-location-not-changing-the-path
			}
		  });
		  

	$scope.ref = firebase.database().ref().child("anggota");
	$scope.anggota = $firebaseObject($scope.ref.child($scope.id));

	$scope.ubah=function(namaBaru, alamatBaru, nomorHpBaru){
		$scope.anggota.nama = namaBaru;
		$scope.anggota.alamat = alamatBaru;
		$scope.anggota.nomorHp = nomorHpBaru;

		$scope.anggota.$save()
		.then(function(){
			console.log("Ubah Berhasil")
		})
		.catch(function(error){
			console.log("Error", error);
		})
	}
})