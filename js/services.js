// js/services/todos.js
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
            insert : function (newData) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/users',newData);
        },
            delete : function(id){
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+"/users/"+id);
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
            return $http.delete(baseUrl+"/tasks/"+id);
            },
            insert : function (newData) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/tasks',newData);
        }
        }
    })
    ;
