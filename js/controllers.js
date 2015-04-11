var demoControllers = angular.module('demoControllers', []);


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

  $scope.deleteUser = function(id){
    Tasks.delete(id).success(function () {
                $scope.status = 'Deleted Task!';
                Tasks.get().success(function(data){
                    $scope.tasks = data.data;
                });
            }).
            error(function(error) {
                $scope.status = 'Unable to delete tasks: ' + error.message;
            });
  }

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
                 alert("User Has been Added");
                $scope.status = 'Inserted User!';
            }).
            error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
                alert('Unable to insert user: ' + error.message);
            });
}}]);

demoControllers.controller('AddTaskController', ['$scope', '$http', 'Tasks', 'Llamas','$window' , function($scope, $http,  Tasks, Llamas,$window) {

  Llamas.get().success(function(data){
    $scope.users = data.data;
  });
   $scope.changetask = function(){
    var newData={
      name:$scope.newname,
      description:$scope.newdes,
      deadline:$scope.newdead,
      assignedUserName:$scope.assigneduser
    };
    console.log(newData);

  Tasks.insert(newData)
            .success(function () {
                 console.log('successful add');
                 alert("Task Has been Added");
                $scope.status = 'Inserted Task!';
            }).
            error(function(error) {
                $scope.status = 'Unable to insert customer: ' + error.message;
                alert('Unable to insert Task: ' + error.message);
            });
}}]);

demoControllers.controller('EditTaskController', ['$scope', '$http', 'Llamas', 'Tasks', '$window', '$routeParams', function($scope, $http, Llamas, Tasks, $window, $routeParams) {
    var param = String($routeParams.id);
    var user = "";
    var userid = "";
    var taskstat = "";
    $scope.complete = "false";
    Tasks.getOne(param).success(function(data) {
        $scope.task = data.data;
        $scope.name = $scope.task.name;
        $scope.ds = $scope.task.description;
        $scope.date = $scope.task.deadline;
        userid = $scope.task.assignedUser;
        user = $scope.task.assignedUserName;
        taskstat = $scope.task.completed;
        Llamas.get().success(function(data) {
            $scope.users = data.data;
            var unassign = {
                name: "unassigned",
                email: "unassigned",
                _id: ""
            };
            $scope.users.push(unassign);
        });
    });

    $scope.edittask = function() {
        var post = {
            name: $scope.name,
            assignedUserName: $scope.suser.name,
            assignedUser: $scope.suser._id,
            completed: $scope.complete,
            description: $scope.ds,
            deadline: $scope.date
        };
        Tasks.putdata(param, post).success(function(data) {
            console.log("done!");

        });
        Tasks.getOne(param).success(function(data) {
            $scope.editdata = data.data;
        })
        if (String(taskstat) == "uassigned" && String(post.completed) == "unassigned") {
            console.log("Both completed");
        }
        if (String(taskstat) == "true" && String(post.completed) == "false") {
            if (String(post.assignedUserName) != "unassigned") {
                Llamas.getOne(post.assignedUser).success(function(data) {
                    var us = data.data;
                    us.pendingTasks.push($scope.editdata._id);
                    Users.putdata(us._id, us).success(function(data) {
                        console.log("done!!!!");
                    });
                });
            }
        }
        if (String(taskstat) == "false" && String(post.completed) == "true") {
            if (String(user) != "unassigned") {
                Llamas.getOne(userid).success(function(data) {
                    var usc = data.data;
                    var xi = 0;
                    var s = 0;
                    for (xi = 0; xi < usc.pendingTasks.length; xi++) {
                        if (usc.pendingTasks[xi] == $scope.edittask._id) {
                            s = xi;
                        }
                    }
                    usc.pendingTasks.splice(s, 1);
                    Llamas.putdata(usc._id, usc).success(function() {
                        console.log("done111");
                    });
                });

            }

        }
        if (String(taskstat) == "false" && String(post.completed) == "false") {
            if (String(user) == "unassigned" && String(post.assignedUserName) != "unassigned") {
                Users.getd(post.assignedUser).success(function(data) {
                    var us = data.data;
                    us.pendingTasks.push($scope.editdata._id);
                    Users.putdata(us._id, us).success(function(data) {
                        console.log("done!!!!");
                    });
                });
            }
            if (String(user) != "unassigned" && String(post.assignedUserName) == "unassigned") {
                Users.getd(userid).success(function(data) {
                    var usc = data.data;
                    var xi = 0;
                    var s = 0;
                    for (xi = 0; xi < usc.pendingTasks.length; xi++) {
                        if (usc.pendingTasks[xi] == $scope.edittask._id) {
                            s = xi;
                        }
                    }
                    usc.pendingTasks.slice(s, 1);
                    Users.putdata(usc._id, usc).success(function() {
                        console.log("done11133");
                    });
                });
            }
            if (String(user) != "unassigned" && String(post.assignedUserName) != "unassigned" && String(user) != String(post.assignedUserName)) {
                Users.getd(userid).success(function(data) {
                    var usc = data.data;
                    var xi = 0;
                    var s = 0;
                    for (xi = 0; xi < usc.pendingTasks.length; xi++) {
                        if (usc.pendingTasks[xi] == $scope.edittask._id) {
                            s = xi;
                        }
                    }
                    usc.pendingTasks.slice(s, 1);
                    Users.putdata(usc._id, usc).success(function() {
                        console.log("done11133");
                    });
                });
                Users.getd(post.assignedUser).success(function(data) {
                    var us1 = data.data;
                    us1.pendingTasks.push($scope.editdata._id);
                    Users.putdata(us1._id, us1).success(function(data) {
                        console.log("done!!!!");
                    });
                });


            }
        }
    }
}]);

