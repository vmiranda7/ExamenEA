angular.module('MainApp', [])

$scope.always = true;
function mainController($scope, $http) {
	$scope.newFilm = {};
	$scope.films = {};
    $scope.filtro = {};
	$scope.selected = false;
    $scope.notchange = false;

	//GET
	$http.get('http://localhost:3000/films/').success(function(data) {
		$scope.films = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	//DELETE
	$scope.borrarUsuario = function(newFIlm) {
		$http.delete('http://localhost:3000/film/' + $scope.newFilm._id)
			.success(function(data) {
				//Borramos los datos añadidos en los imput boxes
				$scope.newFilm = {};
				$scope.selected = false;
				$scope.films = null;
                $scope.notchange =false;

				$http.get('http://localhost:3000/films/').success(function(data) {
					$scope.usuarios = data;
				})
					.error(function(data) {
						console.log('Error: ' + data);
					});

			})
			.error(function(data) {
				console.log('Error: ' + data);
				window.alert('Error:' + data);
			});
	};

	//POST LISTA
	$scope.registrarUsuario = function() {
        console.log($scope.newFilm);
		$http.post('http://localhost:3000/films/', $scope.newFilm)
		.success(function(data) {
				$scope.newFilm = {};
				$scope.films.push(data);
				console.log(data);
			})
		.error(function(data) {
			console.log('Error: ' + data);
			window.alert('Error: ' + data);
		});
	};

	//UPDATE LISTA
	$scope.modificarUsuario = function(newFilm) {
		$http.put('http://localhost:3000/film/' + $scope.newFilm._id, $scope.newFilm)
		.success(function(data) {
				$scope.newFilm = {};
				$scope.selected = false;
				$scope.notchange = false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
			window.alert('Error:' + data);
		});
	};



	// Función para coger el objeto seleccionado en la tabla
	$scope.selectFilm = function(usuario) {
		$scope.newFilm = usuario;
		$scope.selected = true;
		$scope.notchange = true;
		console.log($scope.newFilm, $scope.selected);
	};

}