angular.module('demoServices', [])
        .factory('CommonData', function(){
        var data = "";
        return{
            getData : function(){
                return data;
            },
            setData : function(newData){
                data = newData;                
            }
        }
    })
    .factory('Llamas', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/users');
            },
            getOne : function(params){
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/users/'+params);
            },
            getID : function(params){
              var baseUrl = $window.sessionStorage.baseurl;
              return $http.get(baseUrl+'/users?where={"name": "'+params+'"}');   
            },
            insert : function (newData) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/users',newData);
            },
            delete : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+"/users/"+id);
            },
            postdata : function(data) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.post(baseUrl+'/users',data);
            },
            putdata : function(param,data) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.put(baseUrl+'/users/'+param,data);
            }
        }
    })
    .factory('Tasks', function($http, $window) {      
        return {
            get : function() {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/tasks');
            },
            getOne : function(params){
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/tasks/'+params);
            },
            delete : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+'/tasks/'+id);
            },
            insert : function (newData) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/tasks',newData);
            },
            getrequest : function(request) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/tasks'+request);   
            },
             getparam : function(arg) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/tasks?where={"assignedUserName":"'+arg+'","completed":false}');
            },
            getparamt : function(arg) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.get(baseUrl+'/tasks?where={"assignedUserName":"'+arg+'","completed":"true"}');
            },
            putdata : function(param,data) {
                var baseUrl = $window.sessionStorage.baseurl;
                return $http.put(baseUrl+'/tasks/'+param,data);
            }
        }
    })
    ;
