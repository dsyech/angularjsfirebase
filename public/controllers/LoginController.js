var app = angular.module('LoginController', ['firebase'])

app.controller('LoginController', function($scope, $location) {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log(user);
          $location.url("/beranda");
          $scope.$apply(); //solution from : https://stackoverflow.com/questions/11784656/angularjs-location-not-changing-the-path
        } else {
          // No user is signed in.
        }
      });

    $scope.login = function(){
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            $scope.user = result.user;
            console.log($scope.user);
            $location.url("/beranda");
            $scope.$apply(); //solution from : https://stackoverflow.com/questions/11784656/angularjs-location-not-changing-the-path
            console.log("harusnya login ni");
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
    }
  });

