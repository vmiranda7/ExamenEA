angular.module('MainApp', [])


function mainController($scope, $http) {
	$scope.newUsuario = {};
	$scope.usuarios = {};
    $scope.filtro = {};
	$scope.selected = false;
    $scope.notchange = false;

	//GET
	$http.get('http://localhost:3000/users/').success(function(data) {
		$scope.usuarios = data;
		console.log(data);
	})
	.error(function(data) {
		console.log('Error: ' + data);
	});

	//DELETE
	$scope.borrarUsuario = function(newUsuario) {
		$http.delete('http://localhost:3000/user/' + $scope.newUsuario._id)
			.success(function(data) {
				//Borramos los datos añadidos en los imput boxes
				$scope.newUsuario = {};
				$scope.selected = false;
				$scope.usuarios = null;
                $scope.notchange =false;

				$http.get('http://localhost:3000/users/').success(function(data) {
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
		$http.post('http://localhost:3000/users/', $scope.newUsuario)
		.success(function(data) {
				$scope.newUsuario = {};
				$scope.usuarios.push(data);
				console.log(data);
			})
		.error(function(data) {
			console.log('Error: ' + data);
			window.alert('Error: ' + data);
		});
	};

	//UPDATE LISTA
	$scope.modificarUsuario = function(newUsuario) {
		$http.put('http://localhost:3000/user/' + $scope.newUsuario._id, $scope.newUsuario)
		.success(function(data) {
				$scope.newUsuario = {};
				$scope.selected = false;
				$scope.notchange = false;
			})
		.error(function(data) {
			console.log('Error: ' + data);
			window.alert('Error:' + data);
		});
	};



	// Función para coger el objeto seleccionado en la tabla
	$scope.selectUsuario = function(usuario) {
		$scope.newUsuario = usuario;
		$scope.selected = true;
		$scope.notchange = true;
		console.log($scope.newUsuario, $scope.selected);
	};

    $scope.prueba = function() {
        $scope.filterselected=true;
        console.log($scope.filtro);

    };

}