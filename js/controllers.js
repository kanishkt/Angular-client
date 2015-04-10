var demoControllers = angular.module('demoControllers', []);

demoControllers.controller('FirstController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
  $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

demoControllers.controller('SecondController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


demoControllers.controller('LlamaListController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


}]);

demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

demoControllers.controller('UserController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.users = data.data;
  });

  $scope.deleteUser = function(id){
    Llamas.delete(id).success(function () {
                $scope.status = 'Deleted User!';
                Llamas.get().success(function(data){
                    $scope.users = data.data;
                });
            }).
            error(function(error) {
                $scope.status = 'Unable to delete customer: ' + error.message;
            });
  }

}]);

demoControllers.controller('TaskController', ['$scope', '$http', 'Tasks', '$window' , function($scope, $http,  Tasks, $window) {

  Tasks.get().success(function(data){
    $scope.tasks = data.data;
  });


}]);

demoControllers.controller('DetailUserController', ['$scope', '$http', 'Llamas', '$routeParams','$window',  function($scope, $http,  Llamas, $routeParams, $window) {

   $scope.ID = $routeParams.ID;
  Llamas.getOne($routeParams.ID).success(function(data){
    $scope.detailUser = data.data;
    console.log(data.data);
  });


}]);

demoControllers.controller('DetailTaskController', ['$scope', '$http', 'Tasks', '$routeParams','$window',  function($scope, $http,  Tasks, $routeParams, $window) {

   $scope.ID = $routeParams.ID;
  Tasks.getOne($routeParams.ID).success(function(data){
    $scope.detailTasks = data.data;
  });


}]);

demoControllers.controller('AddUserController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {
  
  $scope.changename = function(){
    var newData={
      name:$scope.newname,
      email:$scope.newemail
    };

  Llamas.insert(newData)
            .success(function () {
                 console.log('successful add');
                $scope.status = 'Inserted User!';
            }).
            error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
            });
}}]);

demoControllers.controller('AddTaskController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.users = data.data;
  });
}]);


