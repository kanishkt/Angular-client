var demoControllers = angular.module('demoControllers', []);


demoControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url; 
    $scope.displayText = "URL set";

  };

}]);

demoControllers.controller('UserController', ['$scope', '$http', 'Llamas', 'Tasks','$window' , function($scope, $http,  Llamas, Tasks, $window) {

  Llamas.get().success(function(data){
    $scope.users = data.data;
  });

  $scope.deleteUser = function(param) {
    var x= param.pendingTasks;
    var i = 0;
    for(i=0;i<x.length;i++) {
      Tasks.getOne(x[i]).success(function(data) {
        $scope.inn = data.data;
        $scope.inn.assignedUser ="";
        $scope.inn.assignedUserName = "unassigned";
        Tasks.putdata($scope.inn._id,$scope.inn).success(function() {
          console.log("Deleted User");
        });
      });
    }
    Llamas.delete(param._id).success(function() {
      Llamas.get().success(function(data) {
        $scope.users = data.data;
      });
    });
  }

}]);

demoControllers.controller('TaskController', ['$scope', '$http', 'Tasks',  'Llamas','$window' , function($scope, $http,  Tasks,  Llamas,$window) {

 $scope.start = 0;
 $scope.end = 10;
 $scope.pages = 0;
 $scope.currpage = 1;
 $scope.count = 0;
  var req = '?where={"completed":false}&sort={"assignedUserName":1}';
  Tasks.getrequest(req).success(function(data){
    $scope.tasks = data.data;
    $scope.pagenum = 1;
    $scope.currtasks = $scope.tasks.slice($scope.start,$scope.end);
    $scope.pages = Math.ceil(($scope.tasks.length)/10);
    $scope.dropdown="name";
    $scope.all="pending";
    $scope.ordersort="Ascending";
  });
  
  $scope.$watch('tasks', function() {
    $scope.count = $scope.tasks.length;
    $scope.pages = Math.ceil(($scope.tasks.length)/10);
  });


  $scope.deletetask = function(param) {
    
    Tasks.delete(param._id).success(function() {
          Tasks.getrequest(req).success(function(data){
            $scope.tasks = data.data;
            $scope.currtasks = $scope.tasks.slice($scope.start,$scope.end);
            });
       });

    var userdel = param.assignedUserName;
    if(userdel == "unassigned") {

    }
    else {
      if(param.completed == false) {
      Llamas.getOne(param.assignedUser).success(function(data) {
        var llamas = data.data;
        var x = 0;
        var narr = [];
        for(x=0;x<llamas.pendingTasks.length;x++) {
          if(llamas.pendingTasks[x] != param._id) {
           narr.push($scope.llamas.pendingTasks[x]);
          }
          
        }
        llamas.pendingTasks = narr;

        Llamas.putdata(llamas._id,llamas).success(function(data) {
          var x = data.data;
          console.log("Success");
        });
      });
     }
    }
    
  }
  $scope.next = function() {
      if($scope.currpage + 1 <= $scope.pages) {
        $scope.start += 10;
        $scope.end += 10;
        $scope.currtasks = $scope.tasks.slice($scope.start,$scope.end);
        $scope.currpage += 1;
      }
    }
  $scope.prev = function() {
      if($scope.currpage - 1 > 0) {
        $scope.start -= 10;
        $scope.end -= 10;
        $scope.currtasks = $scope.tasks.slice($scope.start,$scope.end);
        $scope.currpage -= 1;
      }
    } 
  $scope.clickevent = function() {
    var request='sort={"'+$scope.dropdown+'":';

    if($scope.ordersort=='Ascending') {
      request = request + '1}'
    }
    else {
      request = request + '-1}'
    }
    
    if($scope.all == "all") {
      request = '?'+request;
    }
    else {
      if($scope.all == "completed") {
        request = '?where={"completed":true}&' + request;
      }
      else {
        request = '?where={"completed":false}&' + request;
      }
    }
    req = request;
    Tasks.getrequest(request).success(function(data) {
      $scope.tasks = data.data;
      $scope.currpage = 1;
      $scope.start = 0;
      $scope.end = 10;
      $scope.currtasks = $scope.tasks.slice($scope.start,$scope.end);
      $scope.pages = Math.ceil(($scope.tasks.length)/10);
    });
  } 

  $scope.sortclick = function() {
    var request='sort={"'+$scope.dropdown+'":';

    if($scope.ordersort=='Ascending') {
      request = request + '1}'
    }
    else {
      request = request + '-1}'
    }
    
    if($scope.all == "all") {
      request = '?'+request;
    }
    else {
      if($scope.all == "completed") {
        request = '?where={"completed":true}&' + request;
      }
      else {
        request = '?where={"completed":false}&' + request;
      }
    }
    
    req = request;
    Tasks.getrequest(request).success(function(data) {
      $scope.tasks = data.data;
      $scope.currpage = 1;
      $scope.start = 0;
      $scope.end = 10;
      $scope.currtasks = $scope.tasks.slice($scope.start,$scope.end);
      $scope.pages = Math.ceil(($scope.tasks.length)/10);
    });
  }

  $scope.orderclick = function() {
    var request='sort={"'+$scope.dropdown+'":';

    if($scope.ordersort=='Ascending') {
      request = request + '1}'
    }
    else {
      request = request + '-1}'
    }
    
    if($scope.all == "all") {
      request = '?'+request;
    }
    else {
      if($scope.all == "completed") {
        request = '?where={"completed":true}&' + request;
      }
      else {
        request = '?where={"completed":false}&' + request;
      }
    }
    
    req = request;
    Tasks.getrequest(request).success(function(data) {
      $scope.tasks = data.data;
      $scope.currpage = 1;
      $scope.start = 0;
      $scope.end = 10;
      $scope.currtasks = $scope.tasks.slice($scope.start,$scope.end);
      $scope.pages = Math.ceil(($scope.tasks.length)/10);
    });
  }

}]);

demoControllers.controller('DetailUserController', ['$scope', '$http', 'Llamas', 'Tasks','$routeParams','$window',  function($scope, $http,  Llamas, Tasks, $routeParams, $window) {

  $scope.check=false;
  $scope.but=true;
  var param = String($routeParams.id);
  var name="";
  $scope.showcompletedstatus = false;
  $scope.completedstatus = "";
  $scope.showcompleted=false;
  Llamas.getOne(param).success(function(data){
    $scope.user=data.data;
    name = String($scope.user.name);
    
    Tasks.getparam($scope.user.name).success(function(data) {
      
      if(data.data.length!=0) {
         $scope.taskcomp=data.data;
         $scope.check = true;
      }
      else {
           $scope.status="User has no pending Tasks";
      }
    });
  });


  $scope.show = function() {
    $scope.but = false;
    
    Tasks.getparamt($scope.user.name).success(function(data) {
      $scope.completed = data.data;
      if($scope.completed.length!=0) {
        $scope.showcompleted=true;
      }
      else {
        $scope.completedstatus = "User has no completed tasks!";
        $scope.showcompletedstatus = true;
      }
    });
  }

  $scope.completedtask = function(param){
    var post = param;
    post.completed = true;
    Tasks.putdata(param._id,post).success(function(data) {
      Tasks.getparam($scope.user.name).success(function(data) {
      
        if(data.data.length!=0) {
          $scope.taskcomp=data.data;
          $scope.check = true;
          }
        else {
            $scope.status="No pending Tasks";
            $scope.check = false;
           }
          });
      Tasks.getparamt($scope.user.name).success(function(data) {
      $scope.completed = data.data;
      $scope.showcompletedstatus = false;
      $scope.showcompleted = true;
       });

      Llamas.getOne($scope.user._id).success(function(data) {
        $scope.d = data.data;
        var i =0;
        var s = 0;
        for(i=0;i<$scope.d.pendingTasks.length;i++) {
          if($scope.d.pendingTasks[i] == post._id) {
            s = i;
          }
        }
        $scope.d.pendingTasks.splice(s,1);
        Llamas.putdata($scope.d._id,$scope.d).success(function() {
          console.log("Completed");
        });
      });

    });

  }  
  
}]);

demoControllers.controller('DetailTaskController', ['$scope', '$http', 'Tasks', 'Llamas','$routeParams','$window',  function($scope, $http,  Tasks, Llamas, $routeParams, $window) {

  var param = String($routeParams.id);
  Tasks.getOne(param).success(function(data) {
    $scope.task = data.data;
  });
  $scope.change = function() {
    if($scope.complete == "false") {
      $scope.task.completed = false;
      if($scope.task.assignedUserName != 'unassigned') {
        Tasks.putdata($scope.task._id,$scope.task).success(function(data) {
        Llamas.getOne($scope.task.assignedUser).success(function(data) {
          var gets = data.data;
          gets.pendingTasks.push($scope.task._id);
          Llamas.putdata(gets._id,gets).success(function() {;
          });
        });
      });
    }
      
    }
    else {
      $scope.task.completed = true;
      if($scope.task.assignedUserName != 'unassigned') {
        Tasks.putdata($scope.task._id,$scope.task).success(function(data) {
        Llamas.getOne($scope.task.assignedUser).success(function(data) {
          var gets = data.data;
          var i =0;
          var s = 0;
          for(i=0;i<gets.pendingTasks.length;i++) {
            if(gets.pendingTasks[i] == $scope.task._id) {
              s = i;
              }
          }
           gets.pendingTasks.splice(s,1);
           Llamas.putdata(gets._id,gets).success(function() {
             });
        });
      });
    }
    
  }
}

}]);

demoControllers.controller('AddUserController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {
  
  $scope.changename = function(){
    var newData={
      name:$scope.newname,
      email:$scope.newemail
    };

$scope.checker;
  Llamas.insert(newData)
            .success(function () {
                console.log('successful add');
                $scope.checker=1;
                $scope.mess="User "+$scope.newname+" Has been Added";
                $scope.status = 'Inserted User!';
            }).
            error(function(error) {
                $scope.checker=2;
                $scope.status = 'Unable to insert customer: ' + error.message;
                $scope.mess=error.message;
            });
}}]);

demoControllers.controller('AddTaskController', ['$scope', '$http', 'Tasks', 'Llamas','$window' , function($scope, $http,  Tasks, Llamas,$window) {

  Llamas.get().success(function(data){
    $scope.users = data.data;
  });
  $scope.checker;
   $scope.changetask = function(){
    if($scope.assigneduser==undefined){
      var newData={
      name:$scope.newname,
      description:$scope.newdes,
      deadline:$scope.newdead,
      assignedUserName:"unassigned",
      assignedUser:""
      };
    }
    else{
    var newData={
      name:$scope.newname,
      description:$scope.newdes,
      deadline:$scope.newdead,
      assignedUserName:$scope.assigneduser.name,
      assignedUser:$scope.assigneduser._id

    };
  }
    console.log(newData);

  Tasks.insert(newData)
            .success(function () {
                 console.log('successful add');
                $scope.checker=1;
                $scope.mess="Task "+$scope.newname+" Has been Added";
                $scope.status = 'Inserted Task!';
            }).
            error(function(error) {
                $scope.checker=2;
                $scope.status = 'Unable to insert customer: ' + error.message;
                $scope.mess=error.message;
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
        name:"unassigned",
        email:"unassigned",
        _id:""
      };
      $scope.users.push(unassign);
     });
  });
  $scope.edittask = function() {
    $scope.checker;
    if($scope.assigneduser==undefined){
      var post = {
      name:$scope.name,
      assignedUserName:"unassigned",
      assignedUser:"",
      completed:$scope.complete,
      description:$scope.ds,
      deadline:$scope.date
    };
    }
    else{
    var post = {
      name:$scope.name,
      assignedUserName:$scope.assigneduser.name,
      assignedUser:$scope.assigneduser._id,
      completed:$scope.complete,
      description:$scope.ds,
      deadline:$scope.date
    };
  }
    Tasks.putdata(param,post).success(function(data) {
       $scope.checker=1;
       $scope.fin1="Task Editted";
    }).
            error(function(error) {
                $scope.checker=2;
                $scope.fin1=error.message;
            });
    Tasks.getOne(param).success(function(data) {
      $scope.editdata = data.data;
    })
    if(String(taskstat) == "unassigned" && String(post.completed)=="unassigned")
     {
     }
    if(String(taskstat) == "true" && String(post.completed)=="false")
     {
       if(String(post.assignedUserName)!="unassigned")
       {
        Llamas.getOne(post.assignedUser).success(function(data) {
          var us = data.data;
          us.pendingTasks.push($scope.editdata._id);
          Llamas.putdata(us._id, us).success(function(data) {
          });
        });
       }
    }
     if(String(taskstat) == "false" && String(post.completed)=="true")
     {
       if(String(user)!= "unassigned") {
        Llamas.getOne(userid).success(function(data) {
          var usc = data.data;
          var i = 0;
          var s = 0;
          for(i=0;i<usc.pendingTasks.length;i++) {
            if(usc.pendingTasks[i] == $scope.edittask._id) {
              s = i;
            }
          }
          usc.pendingTasks.splice(s,1);
          Llamas.putdata(usc._id,usc).success(function() {
          }); 
        });

       }
      
     }
     if(String(taskstat) == "false" && String(post.completed)=="false")
     {
       if(String(user)=="unassigned" && String(post.assignedUserName)!="unassigned")
       {
        Llamas.getOne(post.assignedUser).success(function(data) {
          var us = data.data;
          us.pendingTasks.push($scope.editdata._id);
          Llamas.putdata(us._id, us).success(function(data) {
            console.log("Completed1");
          });
        });
       }
      if(String(user)!="unassigned" && String(post.assignedUserName)=="unassigned") {
        Llamas.getOne(userid).success(function(data) {
          var usc = data.data;
          var i = 0;
          var s = 0;
          for(i=0;i<usc.pendingTasks.length;i++) {
            if(usc.pendingTasks[i] == $scope.edittask._id) {
              s = i;
            }
          }
          usc.pendingTasks.slice(s,1);
          Llamas.putdata(usc._id,usc).success(function() {
          }); 
        });
       }
       if(String(user)!="unassigned" && String(post.assignedUserName)!="unassigned" && String(user)!=String(post.assignedUserName)) {
         Llamas.getOne(userid).success(function(data) {
          var usc = data.data;
          var i = 0;
          var s = 0;
          for(i=0;i<usc.pendingTasks.length;i++) {
            if(usc.pendingTasks[i] == $scope.edittask._id) {
              s = i;
            }
          }
          usc.pendingTasks.slice(s,1);
          Llamas.putdata(usc._id,usc).success(function() {
            }); 
          });
         Llamas.getOne(post.assignedUser).success(function(data) {
          var us1 = data.data;
          us1.pendingTasks.push($scope.editdata._id);
          Llamas.putdata(us1._id, us1).success(function(data) {
            console.log("Completed");
            })
            });


       } 
     }
    }
}]);

