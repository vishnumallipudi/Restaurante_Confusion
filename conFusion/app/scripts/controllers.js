'use strict';
angular.module('confusionApp')
    .controller('MenuController',['$scope','menuFactory',function($scope,menuFactory){
                        /*jshint unused: false */
                        $scope.tab=1;
                        $scope.filtText = '';
                        $scope.showDetails=false;
                        $scope.showMenu=false;
                        $scope.message="Loading ...";
                        $scope.dishes= menuFactory.getDishes().query(
                        function(response){
                            $scope.dishes=response;
                            $scope.showMenu=true;
                        },
                        function(response){
                            $scope.message="Error: "+response.status+" "+response.statusText;
                        }
                        );
                        
                        
                        $scope.select=function(setTab){
                            $scope.tab=setTab; 
                            if(setTab===2)
                                {$scope.filtText="appetizer";}
                            else if(setTab===3)
                                {$scope.filtText="mains";}
                            else if(setTab===4)
                                {$scope.filtText="dessert";}
                            else
                                {$scope.filtText="";}
                        };
                        $scope.isSelected=function(checkTab){
                            return($scope.tab===checkTab);
                        };
                        $scope.toggleDetails=function(){ 
                            $scope.showDetails=!$scope.showDetails;
                        };
                       
    
    }])

    .controller('ContactController',['$scope',function($scope){
        $scope.feedback={mychannel:"",firstName:"",lastName:"",agree:false,email:""};
        var channels=[{value:"tel",label:"Tel."},
                      {value:"Email",label:"Email"}];
        $scope.channels=channels;
        $scope.invalidChannelSelection=false;
    }])

    .controller('FeedbackController',['$scope','feedbackFactory',function($scope,feedbackFactory){
        $scope.sendFeedback=function(){
            console.log($scope.feedback);
            feedbackFactory.getFeedback().save($scope.feedback);
            
            if($scope.feedback.agree && ($scope.feedback.mychannel===""))
                {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
            else
                {
                  $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    console.log($scope.feedback);
                    $scope.feedbackForm.$setPristine();
                    //console.log($scope.feedback);  
                }
        };
    }])

    .controller('DishDetailController',['$scope','$stateParams','menuFactory' ,function($scope,$stateParams,menuFactory) {

           
            $scope.showDish=false;
            $scope.message="Loading ...";
            $scope.dish=menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(function(response){
                            $scope.dish=response;
                            $scope.showDish=true;
                        },
                         function(response){
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                         }
                         );
            
            
            
            
        }])

    .controller('DishCommentController', ['$scope','menuFactory', function($scope,menuFactory) {
            
            //Step 1: Create a JavaScript object to hold the comment from the form
       // $scope.yourcomment={yname:"",ycomment:"",check:"checked",rating:"5"};
            $scope.name='';
            $scope.rating = 5;
            $scope.comment = '';
            $scope.currentdate= new Date().toISOString();
            $scope.submitComment = function () {
                
                //Step 2: This is how you record the date
                //"The date property of your JavaScript object holding the comment"
                $scope.currentdate= new Date().toISOString();
                
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push({
                    rating:$scope.rating,
                    comment:$scope.comment,
                    author:$scope.name,
                    date:$scope.currentdate
                });
                
                $scope.yourcomment={rating:$scope.rating,comment:$scope.comment,author:$scope.name,         date:$scope.currentdate};
                menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
                console.log($scope.yourcomment);
                console.log($scope.dish.comments);
                //Step 4: reset your form to pristine
                
                $scope.name='';
                $scope.rating = 5;
                $scope.comment = '';
                $scope.commentForm.$setPristine();
                //Step 5: reset your JavaScript object that holds your comment
            };
        }])

// implement the IndexController and About Controller here
    .controller('IndexController',['$scope','menuFactory','corporateFactory',function($scope,menuFactory,corporateFactory){
        
        $scope.showDish=false;
        $scope.showPromotion=false;
        $scope.showExechef=false;
        $scope.message="Loading ...";
        $scope.featureddish=menuFactory.getDishes().get({id:0})
        .$promise.then(
                            function(response){
                                $scope.featureddish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
        );
        
       
        
        $scope.promotions=menuFactory.getPromotions().get({id:0})
        .$promise.then(
                        function(response){
                            $scope.promotions=response;
                            $scope.showPromotion=true;
                        },
                        function(response){
                            $scope.message = "Error: "+response.status + " " + response.statusText;
                        }
        );
        
        $scope.exechef=corporateFactory.getLeaders().get({id:3})
        .$promise.then(
                    function(response){
                        $scope.exechef=response;
                        $scope.showExechef=true;
                    },
                    function(response){
                        $scope.message = "Error: "+response.status + " " + response.statusText;
                    }
        );
        
    }])


    .controller('AboutController',['$scope','corporateFactory',function($scope,corporateFactory){
        $scope.showLeaders=false;
        $scope.message="Loading ...";
        $scope.leadership=corporateFactory.getLeaders().query(
                        function(response){
                            $scope.leadership=response;
                            $scope.showLeaders=true;
                        },
                        function(response){
                            $scope.message="Error: "+response.status+" "+response.statusText;
                        }
        );
    }])


;
        