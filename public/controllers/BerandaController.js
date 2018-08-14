var app = angular.module('BerandaController', ['firebase']);

app.controller ('BerandaController', function($scope, $location, $firebaseArray, $firebaseObject){

	//cek login
	$scope.user;
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			$scope.user = user;
			console.log(user);
		} else {
			$location.url("/login");
			$scope.$apply(); //solution from : https://stackoverflow.com/questions/11784656/angularjs-location-not-changing-the-path
		}
		});
		

	$scope.ref = firebase.database().ref().child("anggota");

	//GET : Ambil data dari Firebase
	$scope.items = $firebaseArray ($scope.ref);
	console.log($scope.items);



	//POST : simpan data ke firebase
	$scope.simpan = function(){
		console.log($scope.nama);
		console.log($scope.alamat);
		console.log($scope.nomorHp);

		//setelah ini semua data tersebut dikirim ke FIREBASE
		$scope.items.$add({
			"nama" : $scope.nama,
			"alamat" : $scope.alamat,
			"nomorHp" : $scope.nomorHp
		}).then(function(){
			console.log("Data Berhasil Disimpan");
		}).catch(function(error){
			console.log("ERROR", error);
		});
	}

	$scope.simpan = function() {

        //Solution : https://stackoverflow.com/questions/18571001/file-upload-using-angularjs
        var f = document.getElementById('file').files[0],
            r = new FileReader();
    
        r.onloadend = function(e) {
          $scope.data = e.target.result;
          console.log($scope.data);
          //send your binary data via $http or $resource or do anything else with it
        }
    
        r.readAsBinaryString(f);

        //Solution: https://stackoverflow.com/questions/42973033/upload-file-to-firebase-with-angular-angularjs
         var storage = firebase.storage();
		var storageRef = storage.ref();

		//ambil nilai waktu, untuk jadikan nama
		var timestamp = new Date().getTime();
		//ubah timestampnya jadi string
		var strTimestamp = String(timestamp);

		//masukkan filenya, dengan nama sesuai timestamp
        var filesRef = storageRef.child(strTimestamp);

         filesRef.put(f)
         .then(function(res){
            // ambil URL dari gambar yang berhasil diupload
            console.log(res.a.downloadURLs[0]);
            $scope.urlImage = (res.a.downloadURLs[0]);

			// posting data ke database
            $scope.items.$add({
				"nama" : $scope.nama,
				"alamat" : $scope.alamat,
				"nomorHp" : $scope.nomorHp,
				"foto": $scope.urlImage //url image dari storage
			}).then(function(){
				console.log("Data Berhasil Disimpan");
			}).catch(function(error){
				console.log("ERROR", error);
			});
         });
    }

	//DELETE : Untuk menghapus Data
	$scope.hapus = function(id){
		$scope.anggota = $firebaseObject($scope.ref.child(id));

		$scope.anggota.$remove()
		.then(function(){
			console.log("Data berhasil dihapus");
		})
		.catch(function(error){
			console.log("Error", error);
		})
	}

	$scope.profil = function(id){
		localStorage.setItem('id', id);
		$location.path('/profil');
	}

	//LOGOUT
	    // LOGOUT
		$scope.logout = function(){
			firebase.auth().signOut().then(function() {
				// Sign-out successful.
			  }).catch(function(error) {
				// An error happened.
			  });
		}
	
})