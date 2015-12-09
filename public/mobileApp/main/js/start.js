hostUrl = "http://localhost:8080";

if(window.location.href.indexOf('localhost')==-1){
  hostUrl="http://ida-codefog.rhcloud.com";
}

//global defaults to looking url as new, is replaced by an ide if a user selects a certain item

currentItemLookingId="new";
//currentItemLookingId might be ='cshdhsi72jdgdd6sjs7sjs' or the _id of an item



angular.module('ionicApp', ['ionic', 'ion-google-place', 'angularMoment'])

.config(function ($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('menu', {
      url: "/menu",
      abstract: true,
      templateUrl: "menu.html",
      controller: 'MenuCtrl'
    })
    .state('menu.tabs', {
      url: "/tab",
      views: {
        'menuContent' :{
          templateUrl: "tabs.html"
        }
      }
    })
    .state('menu.tabs.buttons', {
      url: "/buttons",
      views: {
        'buttons-tab': {
          templateUrl: "buttons.html",
          controller: 'ButtonsTabCtrl'
        }
      }
    })
    .state('menu.tabs.list', {
      url: "/list",
      views: {
        'list-tab': {
          templateUrl: "list.html",
          controller: 'ListCtrl'
        }
      }
    })


     .state('menu.tabs.inbox', {
      url: "/inbox",
      views: {
        'inbox-tab': {
          templateUrl: "inbox.html",
          controller: 'ListCtrl'
        }
      }
    })


    .state('menu.tabs.item', {
      url: "/item",
      views: {
        'list-tab': {
          templateUrl: "item.html"
        }
      }
    })
    .state('menu.tabs.form', {
      url: "/form",
      views: {
        'form-tab': {
          templateUrl: "form.html"
        }
      }
    })
    .state('menu.keyboard', {
      url: "/keyboard",
      views: {
        'menuContent': {
          templateUrl: "keyboard.html"
        }
      }
    })

    //introduction default state
     .state('intro', {
    url: '/intro',
    templateUrl: 'intro.html',
    controller: 'IntroCtrl'
  })




    


    //generated states


    //end generated states


    .state('menu.boom', {
      url: "/boom",
      views: {
        'menuContent': {
          templateUrl: "boom.html"
        }
      }
    })

    


   .state('menu.register', {
  cache:false,
  url: "/register",
    views: {
      'menuContent': {
      templateUrl: "register.html"
    }
  }
}) 


   .state('menu.login', {
  cache:false,
  url: "/login",
    views: {
      'menuContent': {
      templateUrl: "login.html"
    }
  }
}) 





       .state('menu.findPeople', {
  cache:false,
  url: "/findPeople",
    views: {
      'menuContent': {
      templateUrl: "findPeople.html"
    }
  }
}) 


      .state('menu.viewProfile', {
  cache:false,
  url: "/viewProfile",
    views: {
      'menuContent': {
      templateUrl: "viewProfile.html"
    }
  }


}) 



     .state('menu.messages', {
      url: "/messages",
      views: {
        'menuContent' :{
          templateUrl: "messages.html",
          controller:"MessagesCtrl"
        }
      }
    })

       .state('menu.conversation', {
      url: "/conversation",
      views: {
        'menuContent' :{
          templateUrl: "conversation.html",
          controller:"ConversationCtrl"
        }
      }
    })



       //object states



       //end object states









    .state('menu.slidebox', {
      url: "/slidebox",
      views: {
        'menuContent': {
          templateUrl: "slidebox.html",
          controller: 'SlideboxCtrl'
        }
      }
    })
    .state('menu.about', {
      url: "/about",
      views: {
        'menuContent': {
          templateUrl: "about.html"
        }
      }
    });

  $urlRouterProvider.otherwise("menu/tab/buttons");

})

.controller('ListCtrl', function ($scope) {

  $scope.data = {
    showDelete: false
  };

  $scope.itemButtons = [
    {
      text: 'Delete',
      type: 'button-assertive',
      onTap: function (item) {
        alert('Delete Item: ' + item.id + ' ?');
      }
    }
  ];

  $scope.onItemDelete = function (item) {
    $scope.items.splice($scope.items.indexOf(item), 1);
  };

  $scope.items = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    },
    {
      id: 6
    },
    {
      id: 7
    },
    {
      id: 8
    },
    {
      id: 9
    },
    {
      id: 10
    }
  ];

})

.controller('ButtonsTabCtrl', function ($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
    $scope.showPopup = function () {
     $ionicPopup.alert({
       title: 'Popup',
       content: 'This is ionic popup alert!'
     });
    };
    $scope.showActionsheet = function () {
        $ionicActionSheet.show({
          titleText: 'Ionic ActionSheet',
          buttons: [
            {
              text: 'Facebook'
            },
            {
              text: 'Twitter'
            },
          ],
          destructiveText: 'Delete',
          cancelText: 'Cancel',
          cancel: function () {
            console.log('CANCELLED');
          },
          buttonClicked: function (index) {
            console.log('BUTTON CLICKED', index);
            return true;
          },
          destructiveButtonClicked: function () {
            console.log('DESTRUCT');
            return true;
          }
        });
    };
})

.controller('SlideboxCtrl', function($scope, $ionicSlideBoxDelegate) {
  $scope.nextSlide = function() {
    $ionicSlideBoxDelegate.next();
  }             
})              

.controller('MenuCtrl', function($scope, $ionicSideMenuDelegate, $ionicModal) {              
  $ionicModal.fromTemplateUrl('modal.html', function (modal) {
    $scope.modal = modal;
  }, {
    animation: 'slide-in-up'
  });

  $ionicModal.fromTemplateUrl('genericModal.html', function (modal) {
    $scope.modal = modal;
    theBigModal = modal;
    bigModal= function(title, words){

      
      theBigModal.show();
      $('#modalWords').html(words);
      $("#modalTitle").html(title);
    }
  }, {
    animation: 'slide-in-up'
  });

 })
  
 .controller('AppCtrl', function() {

  ionic.Platform.ready(function() {

  });

 })






  .controller('MessagesCtrl', function($scope, $http) {


      $scope.goChat= function(userId){
    
        talkingToUser = userId;
         window.location='#/menu/conversation';
    }

 
  $http.get(hostUrl+'/messages/myMessages?format=json').then(function(resp) {
  console.log('Success', resp);
  $scope.contents = resp['data']['messages'];

  var allMessages = $scope.contents;
  var allConverseUsers = [];
  var allChats = [];

checkMessages:
  for( i in allMessages){

    for( j in allConverseUsers){
      
      console.log('skipping a message that came from self...')
      if(currentUserId == allMessages[i]['user']['_id']){
        continue checkMessages;
      }

      else{
        if(allMessages[i]['user']['_id'] == allConverseUsers[j]['_id']){

          continue checkMessages;
          
        }

        if(allMessages[i]['toUser']['_id'] == allConverseUsers[j]['_id']){
          continue checkMessages;
        }
      }

    }
    allConverseUsers.push({'_id':allMessages[i]['user']['_id'], 'username':allMessages[i]['user']['username'], 'email': allMessages[i]['user']['email'], 'createdAt':allMessages[i]['createdAt'],  'body':allMessages[i]['body'] });

  }


  console.log($scope.contents);

  console.log('chat rooms');
  console.log(allConverseUsers);
  $scope.chatRooms = allConverseUsers;


  })

 
})
.controller('ConversationCtrl', function($scope, $http, $ionicScrollDelegate, $timeout, $interval) {


  $scope.userId = currentUserId;

  insideReadingMessages=true;
  numberMessagesInChat= 0;

 $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatContent').scrollBottom();
      }, 0);


  $scope.sendMessage= function(){



   
     $http.post(hostUrl+'/messages/?format=json', {'body':$('#theSendMess').val(), 'title':'new message', toUser:talkingToUser}).then(function(resp) {

     $('#theSendMess').val('');

      console.log('message saved')
      $http.get(hostUrl+'/messages/conversations?format=json&userId='+talkingToUser).then(function(resp1) {
  console.log('Success', resp1);
  updatedConvol8ly = resp1['data']['messages'];
  
    //$scope.conversations= resp1['data']['messages'];
    setTimeout(function(){

         conversationScope.$apply(function(){

            conversationScope.conversations=updatedConvol8ly 
        })

          //scroll down to bottom on message submit
          $timeout(function(){
            $ionicScrollDelegate.$getByHandle('chatContent').scrollBottom();
          },0)
    }, 1)

  console.log('resp1 got new messages')

  })
     })


  }



$scope.pollMessages = function(){

  if(insideReadingMessages == true){
  $http.get(hostUrl+'/messages/conversations?format=json&userId='+talkingToUser).then(function(resp) {


   $scope.conversations = resp['data']['messages'];
   try{
    numberMessagesInChatNow = $scope.conversations.length;
  }
  catch(err){
    numberMessagesInChatNow=0;
    console.log('no messages');
  }
   conversationScope= $scope
   console.log($scope.conversations);
   console.log('polled for messages')

   $timeout(function() {

      if(numberMessagesInChatNow>numberMessagesInChat){
          $ionicScrollDelegate.$getByHandle('chatContent').scrollBottom();
      }
       numberMessagesInChat= numberMessagesInChatNow;
    }, 0);


   $timeout(function(){

      //$scope.pollMessages();
   }, 3000);

  })

  }
}

$scope.pollMessages();








$scope.$on("$destroy",function(){
      insideReadingMessages=false;
});



})



.controller('FindPeopleCtrl', function($scope, $http, $timeout) {
  $http.get(hostUrl+'/users?format=json').then(function(resp) {

    $scope.peoples = resp['data']['users'];

  })


  findProfileScope = $scope;
   $scope.viewProfile= function(userId){
    

        talkingToUser = userId;
         window.location='#/menu/viewProfile';
    }

    $scope.find = function(){

       $http.get(hostUrl+'/users?format=json&criteria={"username":"'+$('#findUserSearch').val()+'", "name":"'+$('#findUserSearch').val()+'"}').then(function(resp) {

        foundPeople = resp['data']['users'];
         $timeout(function(){

           findProfileScope.$apply(function(){

              findProfileScope.peoples=foundPeople
          })

        },1);
       })

    }

})



.controller('ViewProfileCtrl', function($scope, $http) {
  $http.get(hostUrl+'/users/'+talkingToUser+'/?format=json').then(function(resp) {
    console.log(resp);
    $scope.profile = resp['data']['user'];

  })


   $scope.messageUser= function(userId){
    
        //talkingToUser = userId;
         window.location='#/menu/conversation';
    }

})










 .controller('RegisterCtrl', function($scope, $http) {
  $http.get(hostUrl+'/registers?format=json').then(function(resp) {
  console.log('Success', resp);
  $scope.contents = resp['data']['registers'];
   $scope.contents._currentPage= window.location.href; 
  // For JSON responses, resp.data contains the result
  }, function(err) {
  console.error('ERR', err);
  // err.status will contain the status code
})


    $scope.register =function(){

      var username = $('#regName').val();
      var email = $('#regEmail').val();
      var password= $('#regPassword').val();
      var name= $('#regName').val();

      if(username == "" || email =="" || username ==""){

        bigModal("Error", "There was an issue creating your account. Please fill in all fields.");
        return false;
      }

        $http.post(hostUrl+'/users?format=json', {'email':email, 'name':name, 'username':username, 'password':password}).then(function(resp) {


          $http.post(hostUrl+'/users/session/?format=json', {'email':email, 'name':name, 'username':username, 'password':password}).then(function(resp) {

             if(resp.data.page){
              localStorage.setItem('username', username);
              localStorage.setItem('email', email);
              localStorage.setItem('password', password);

              console.log('user logged in')
              console.log(resp)
              window.location = "#/";
            }
            else{
              bigModal("Error", "There was an issue registering you in. Please try again.")

            }


          

              
            

          })
         

        
      
    })

}

})

.controller('LoginCtrl', function($scope, $http) {


  $scope.login = function(){

     var email = $scope.logEmail;
    var password = $scope.logPassword;

    if(email=="" || password ==""){
        bigModal("Error", "Please add a email and a password.")
      return;
    }

     $http.post(hostUrl+'/users/session/?format=json', {'email':email, 'password':password}).then(function(resp) {

      if(resp.data.page){

        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        console.log('user logged in')
        console.log(resp)
        window.location = "#/";
      }
      else{
        bigModal("Error", "Incorrect e-mail and password.")

      }
        
      });
  }



  $http.get(hostUrl+'/logins?format=json').then(function(resp) {
  console.log('Success', resp);
  $scope.contents = resp['data']['logins'];



   $scope.contents._currentPage= window.location.href; 
  // For JSON responses, resp.data contains the result
  }, function(err) {
  console.error('ERR', err);
  // err.status will contain the status code
})
})




.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {
 
  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('menu.register');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
})




//object controllers



//end object controllers



 
              
              