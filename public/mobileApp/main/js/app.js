hostUrl = "http://localhost:8080";
if (window.location.href.indexOf('localhost') == -1) {
  hostUrl = "http://ida-codefog.rhcloud.com";
}
//global defaults to looking url as new, is replaced by an ide if a user selects a certain item
currentItemLookingId = "new";
//currentItemLookingId might be ='cshdhsi72jdgdd6sjs7sjs' or the _id of an item
angular.module('ionicApp', ['ionic', 'ion-google-place', 'angularMoment', 'ion-gallery', 'ya.nouislider'])
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })
  .config(function($stateProvider, $urlRouterProvider) {
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
          'menuContent': {
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
      .state('menu.tabs.browse', {
        cache: false,
        url: "/browse",
        views: {
          'browse-tab': {
            templateUrl: "browse.html"
          }
        }
      })
      .state('menu.browse', {
        cache: false,
        url: "/browse",
        views: {
          'menuContent': {
            templateUrl: "browse.html"
          }
        }
      }).state('menu.tabs.myAccount', {
        cache: false,
        url: "/myAccount",
        views: {
          'myAccount-tab': {
            templateUrl: "myAccount.html"
          }
        }
      })
      .state('menu.myAccount', {
        cache: false,
        url: "/myAccount",
        views: {
          'menuContent': {
            templateUrl: "myAccount.html"
          }
        }
      }).state('menu.tabs.recentlyViewed', {
        cache: false,
        url: "/recentlyViewed",
        views: {
          'recentlyViewed-tab': {
            templateUrl: "recentlyViewed.html"
          }
        }
      })
      .state('menu.recentlyViewed', {
        cache: false,
        url: "/recentlyViewed",
        views: {
          'menuContent': {
            templateUrl: "recentlyViewed.html"
          }
        }
      })
      .state('menu.tabs.search', {
        cache: false,
        url: "/search",
        views: {
          'search-tab': {
            templateUrl: "search.html"
          }
        }
      })
      .state('menu.search', {
        cache: false,
        url: "/search",
        views: {
          'menuContent': {
            templateUrl: "search.html"
          }
        }
      })
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
        cache: false,
        url: "/register",
        views: {
          'menuContent': {
            templateUrl: "register.html"
          }
        }
      })
      .state('menu.login', {
        cache: false,
        url: "/login",
        views: {
          'menuContent': {
            templateUrl: "login.html"
          }
        }
      })
      .state('menu.findPeople', {
        cache: false,
        url: "/findPeople",
        views: {
          'menuContent': {
            templateUrl: "findPeople.html"
          }
        }
      })
      .state('menu.viewProfile', {
        cache: false,
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
          'menuContent': {
            templateUrl: "messages.html",
            controller: "MessagesCtrl"
          }
        }
      })
      .state('menu.conversation', {
        url: "/conversation",
        views: {
          'menuContent': {
            templateUrl: "conversation.html",
            controller: "ConversationCtrl"
          }
        }
      })
      //object states
      .state('menu.coders', {
        cache: false,
        url: "/coders",
        views: {
          'menuContent': {
            templateUrl: "coders.html"
          }
        }
      })
      .state('menu.codersForm', {
        cache: false,
        url: "/codersForm",
        views: {
          'menuContent': {
            templateUrl: "codersForm.html"
          }
        }
      })
      .state('menu.codersShow', {
        cache: false,
        url: "/codersShow",
        views: {
          'menuContent': {
            templateUrl: "codersShow.html"
          }
        }
      })
      .state('menu.codersMyList', {
        cache: false,
        url: "/codersMyList",
        views: {
          'menuContent': {
            templateUrl: "codersMyList.html"
          }
        }
      })
      .state('menu.photos', {
        cache: false,
        url: "/photos",
        views: {
          'menuContent': {
            templateUrl: "photos.html"
          }
        }
      })
      .state('menu.photosForm', {
        cache: false,
        url: "/photosForm",
        views: {
          'menuContent': {
            templateUrl: "photosForm.html"
          }
        }
      })
      .state('menu.photosShow', {
        cache: false,
        url: "/photosShow",
        views: {
          'menuContent': {
            templateUrl: "photosShow.html"
          }
        }
      })
      .state('menu.photosMyList', {
        cache: false,
        url: "/photosMyList",
        views: {
          'menuContent': {
            templateUrl: "photosMyList.html"
          }
        }
      })
      //end object states
      .state('menu.profile', {
        url: "/profile",
        views: {
          'menuContent': {
            templateUrl: "profile.html"
          }
        }
      })
      .state('menu.profileEdit', {
        url: "/profile/edit",
        views: {
          'menuContent': {
            templateUrl: "profileEdit.html"
          }
        }
      })
      .state('menu.creditCard', {
        url: "/creditCard",
        views: {
          'menuContent': {
            templateUrl: "creditCard.html"
          }
        }
      })
      .state('menu.categories', {
        url: "/categories",
        views: {
          'menuContent': {
            templateUrl: "categories.html"
          }
        }
      })
      .state('menu.categorie', {
        url: "/categorie/:_id",
        views: {
          'menuContent': {
            templateUrl: "products.html"
          }
        }
      })
      .state('menu.product', {
        url: "/product/:_id",
        views: {
          'menuContent': {
            templateUrl: "product.html"
          }
        }
      })
      .state('menu.payment', {
        url: "/payment",
        views: {
          'menuContent': {
            templateUrl: "payment.html"
          }
        }
      })
      .state('menu.map', {
        url: "/map",
        views: {
          'menuContent': {
            templateUrl: "map.html"
          }
        }
      })
      .state('menu.filter', {
        url: "/filter",
        views: {
          'menuContent': {
            templateUrl: "filter.html"
          }
        }
      })
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
  .controller('ListCtrl', function($scope) {
    $scope.data = {
      showDelete: false
    };
    $scope.itemButtons = [{
      text: 'Delete',
      type: 'button-assertive',
      onTap: function(item) {
        alert('Delete Item: ' + item.id + ' ?');
      }
    }];
    $scope.onItemDelete = function(item) {
      $scope.items.splice($scope.items.indexOf(item), 1);
    };
    $scope.items = [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }, {
      id: 4
    }, {
      id: 5
    }, {
      id: 6
    }, {
      id: 7
    }, {
      id: 8
    }, {
      id: 9
    }, {
      id: 10
    }];
  })
  .controller('ButtonsTabCtrl', function($scope, $ionicPopup, $ionicActionSheet, $ionicModal) {
    $scope.showPopup = function() {
      $ionicPopup.alert({
        title: 'Popup',
        content: 'This is ionic popup alert!'
      });
    };
    $scope.showActionsheet = function() {
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
        cancel: function() {
          console.log('CANCELLED');
        },
        buttonClicked: function(index) {
          console.log('BUTTON CLICKED', index);
          return true;
        },
        destructiveButtonClicked: function() {
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
    $ionicModal.fromTemplateUrl('modal.html', function(modal) {
      $scope.modal = modal;
    }, {
      animation: 'slide-in-up'
    });
    $ionicModal.fromTemplateUrl('genericModal.html', function(modal) {
      $scope.modal = modal;
      theBigModal = modal;
      bigModal = function(title, words) {
        theBigModal.show();
        $('#modalWords').html(words);
        $("#modalTitle").html(title);
      }
    }, {
      animation: 'slide-in-up'
    });
  })
  .controller('AppCtrl', function() {
    ionic.Platform.ready(function() {});
  })
  .controller('MessagesCtrl', function($scope, $http) {
    $scope.goChat = function(userId) {
      talkingToUser = userId;
      window.location = '#/menu/conversation';
    }
    $http.get(hostUrl + '/messages/myMessages?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['messages'];
      var allMessages = $scope.contents;
      var allConverseUsers = [];
      var allChats = [];
      checkMessages:
        for (i in allMessages) {
          for (j in allConverseUsers) {
            console.log('skipping a message that came from self...')
            if (currentUserId == allMessages[i]['user']['_id']) {
              continue checkMessages;
            } else {
              if (allMessages[i]['user']['_id'] == allConverseUsers[j]['_id']) {
                continue checkMessages;
              }
              if (allMessages[i]['toUser']['_id'] == allConverseUsers[j]['_id']) {
                continue checkMessages;
              }
            }
          }
          allConverseUsers.push({
            '_id': allMessages[i]['user']['_id'],
            'username': allMessages[i]['user']['username'],
            'email': allMessages[i]['user']['email'],
            'createdAt': allMessages[i]['createdAt'],
            'body': allMessages[i]['body']
          });
        }
      console.log($scope.contents);
      console.log('chat rooms');
      console.log(allConverseUsers);
      $scope.chatRooms = allConverseUsers;
    })
  })
  .controller('ConversationCtrl', function($scope, $http, $ionicScrollDelegate, $timeout, $interval) {
    $scope.userId = currentUserId;
    insideReadingMessages = true;
    numberMessagesInChat = 0;
    $timeout(function() {
      $ionicScrollDelegate.$getByHandle('chatContent').scrollBottom();
    }, 0);
    $scope.sendMessage = function() {
      $http.post(hostUrl + '/messages/?format=json', {
        'body': $('#theSendMess').val(),
        'title': 'new message',
        toUser: talkingToUser
      }).then(function(resp) {
        $('#theSendMess').val('');
        console.log('message saved')
        $http.get(hostUrl + '/messages/conversations?format=json&userId=' + talkingToUser).then(function(resp1) {
          console.log('Success', resp1);
          updatedConvol8ly = resp1['data']['messages'];
          //$scope.conversations= resp1['data']['messages'];
          setTimeout(function() {
            conversationScope.$apply(function() {
                conversationScope.conversations = updatedConvol8ly
              })
              //scroll down to bottom on message submit
            $timeout(function() {
              $ionicScrollDelegate.$getByHandle('chatContent').scrollBottom();
            }, 0)
          }, 1)
          console.log('resp1 got new messages')
        })
      })
    }
    $scope.pollMessages = function() {
      if (insideReadingMessages == true) {
        $http.get(hostUrl + '/messages/conversations?format=json&userId=' + talkingToUser).then(function(resp) {
          $scope.conversations = resp['data']['messages'];
          try {
            numberMessagesInChatNow = $scope.conversations.length;
          } catch (err) {
            numberMessagesInChatNow = 0;
            console.log('no messages');
          }
          conversationScope = $scope
          console.log($scope.conversations);
          console.log('polled for messages')
          $timeout(function() {
            if (numberMessagesInChatNow > numberMessagesInChat) {
              $ionicScrollDelegate.$getByHandle('chatContent').scrollBottom();
            }
            numberMessagesInChat = numberMessagesInChatNow;
          }, 0);
          $timeout(function() {
            //$scope.pollMessages();
          }, 3000);
        })
      }
    }
    $scope.pollMessages();
    $scope.$on("$destroy", function() {
      insideReadingMessages = false;
    });
  })
  .controller('FindPeopleCtrl', function($scope, $http, $timeout) {
    $http.get(hostUrl + '/users?format=json').then(function(resp) {
      $scope.peoples = resp['data']['users'];
    })
    findProfileScope = $scope;
    $scope.viewProfile = function(userId) {
      talkingToUser = userId;
      window.location = '#/menu/viewProfile';
    }
    $scope.find = function() {
      $http.get(hostUrl + '/users?format=json&criteria={"username":"' + $('#findUserSearch').val() + '", "name":"' + $('#findUserSearch').val() + '"}').then(function(resp) {
        foundPeople = resp['data']['users'];
        $timeout(function() {
          findProfileScope.$apply(function() {
            findProfileScope.peoples = foundPeople
          })
        }, 1);
      })
    }
  })
  .controller('ViewProfileCtrl', function($scope, $http) {
    $http.get(hostUrl + '/users/' + talkingToUser + '/?format=json').then(function(resp) {
      console.log(resp);
      $scope.profile = resp['data']['user'];
    })
    $scope.messageUser = function(userId) {
      //talkingToUser = userId;
      window.location = '#/menu/conversation';
    }
  })
  .controller('RegisterCtrl', function($scope, $http) {
    $http.get(hostUrl + '/registers?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['registers'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.register = function() {
      var username = $('#regName').val();
      var email = $('#regEmail').val();
      var password = $('#regPassword').val();
      var name = $('#regName').val();
      if (username == "" || email == "" || username == "") {
        bigModal("Error", "There was an issue creating your account. Please fill in all fields.");
        return false;
      }
      $http.post(hostUrl + '/users?format=json', {
        'email': email,
        'name': name,
        'username': username,
        'password': password
      }).then(function(resp) {
        $http.post(hostUrl + '/users/session/?format=json', {
          'email': email,
          'name': name,
          'username': username,
          'password': password
        }).then(function(resp) {
          if (resp.data.page) {
            localStorage.setItem('username', username);
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
            console.log('user logged in')
            console.log(resp)
            window.location = "#/";
          } else {
            bigModal("Error", "There was an issue registering you in. Please try again.")
          }
        })
      })
    }
  })
  .controller('LoginCtrl', function($scope, $http) {
    $scope.login = function() {
      var email = $scope.logEmail;
      var password = $scope.logPassword;
      if (email == "" || password == "") {
        bigModal("Error", "Please add a email and a password.")
        return;
      }
      $http.post(hostUrl + '/users/session/?format=json', {
        'email': email,
        'password': password
      }).then(function(resp) {
        if (resp.data.page) {
          localStorage.setItem('email', email);
          localStorage.setItem('password', password);
          console.log('user logged in')
          console.log(resp)
          window.location = "#/";
        } else {
          bigModal("Error", "Incorrect e-mail and password.")
        }
      });
    }
    $http.get(hostUrl + '/logins?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['logins'];
      $scope.contents._currentPage = window.location.href;
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
  .controller('CodersListCtrl', function($scope, $http, $timeout) {
    $http.get(hostUrl + '/coders?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['coders'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.showProfile = function(theId) {
      currentItemLookingId = theId;
      window.location = '#/menu/codersShow';
    }
    $scope.createNew = function() {
      currentItemLookingId = 'new';
      window.location = '#/menu/codersForm';
    }
    findcodersScope = $scope;
    $scope.find = function() {
      $http.get(hostUrl + '/coders?format=json&criteria={"title":"' + $('#codersSearch').val() + '", "name":"' + $('#codersSearch').val() + '"}').then(function(resp) {
        foundInfo = resp['data']['coders'];
        $timeout(function() {
          findcodersScope.$apply(function() {
            findcodersScope.contents = foundInfo
          })
        }, 1);
      })
    }
  })
  .controller('CodersFormCtrl', function($scope, $http) {
    isNewItem = false;
    $http.get(hostUrl + '/coders/' + currentItemLookingId + '/?format=json').then(function(resp) {
      console.log('Success', resp);
      try {
        if (resp['data']['coder']['title'] != '') {
          $scope.contents = resp['data']['coder'];
        } else {
          isNewItem = true;
        }
      } catch (err) {
        isNewItem = true;
      }
      if (isNewItem == true) {
        $('.createButton').show();
        $('.saveButton').hide();
      } else {
        $('.saveButton').show();
        $('.createButton').hide();
      }
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.save = function() {
      bigModal('Saved!');
      setTimeout(function() {
        window.location = '#/menu/coders';
      })
      $http.put(hostUrl + '/coders/' + currentItemLookingId + '?format=json', {
        'body': $('#codersFormEditBody').val(),
        'title': $('#codersFormEditTitle').val()
      }).then(function(resp) {});
    }
    $scope.create = function() {
      $http.post(hostUrl + '/coders/?format=json', {
        'body': $('#codersFormEditBody').val(),
        'title': $('#codersFormEditTitle').val()
      }).then(function(resp) {
        bigModal('Saved!');
        window.location = '#/menu/coders';
      });
    }
  })
  .controller('CodersShowCtrl', function($scope, $http) {
    $http.get(hostUrl + '/coders/' + currentItemLookingId + '/?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['coder'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.messageUser = function(theId) {
      talkingToUser = theId;
      window.location = '#/menu/conversation';
    }
    $scope.delete = function(theId) {
      bigModal('Content Deleted')
      setTimeout(function() {
        window.location = '#/menu/coders';
      }, 1000)
      $http.delete(hostUrl + '/coders/' + theId).then(function(resp) {});
    }
    $scope.edit = function(theId) {
      currentItemLookingId = theId;
      window.location = '#/menu/carsForm';
    }
  })
  .controller('CodersMyListCtrl', function($scope, $http) {
    $http.get(hostUrl + '/coders?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['coders'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
  })
  .controller('PhotosListCtrl', function($scope, $http, $timeout) {
    $http.get(hostUrl + '/photos?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['photos'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.showProfile = function(theId) {
      currentItemLookingId = theId;
      window.location = '#/menu/photosShow';
    }
    $scope.createNew = function() {
      currentItemLookingId = 'new';
      window.location = '#/menu/photosForm';
    }
    findphotosScope = $scope;
    $scope.find = function() {
      $http.get(hostUrl + '/photos?format=json&criteria={"title":"' + $('#photosSearch').val() + '", "name":"' + $('#photosSearch').val() + '"}').then(function(resp) {
        foundInfo = resp['data']['photos'];
        $timeout(function() {
          findphotosScope.$apply(function() {
            findphotosScope.contents = foundInfo
          })
        }, 1);
      })
    }
  })
  .controller('PhotosFormCtrl', function($scope, $http) {
    isNewItem = false;
    $http.get(hostUrl + '/photos/' + currentItemLookingId + '/?format=json').then(function(resp) {
      console.log('Success', resp);
      try {
        if (resp['data']['photo']['title'] != '') {
          $scope.contents = resp['data']['photo'];
        } else {
          isNewItem = true;
        }
      } catch (err) {
        isNewItem = true;
      }
      if (isNewItem == true) {
        $('.createButton').show();
        $('.saveButton').hide();
      } else {
        $('.saveButton').show();
        $('.createButton').hide();
      }
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.save = function() {
      bigModal('Saved!');
      setTimeout(function() {
        window.location = '#/menu/photos';
      })
      $http.put(hostUrl + '/photos/' + currentItemLookingId + '?format=json', {
        'body': $('#photosFormEditBody').val(),
        'title': $('#photosFormEditTitle').val()
      }).then(function(resp) {});
    }
    $scope.create = function() {
      $http.post(hostUrl + '/photos/?format=json', {
        'body': $('#photosFormEditBody').val(),
        'title': $('#photosFormEditTitle').val()
      }).then(function(resp) {
        bigModal('Saved!');
        window.location = '#/menu/photos';
      });
    }
  })
  .controller('PhotosShowCtrl', function($scope, $http) {
    $http.get(hostUrl + '/photos/' + currentItemLookingId + '/?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['photo'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.messageUser = function(theId) {
      talkingToUser = theId;
      window.location = '#/menu/conversation';
    }
    $scope.delete = function(theId) {
      bigModal('Content Deleted')
      setTimeout(function() {
        window.location = '#/menu/photos';
      }, 1000)
      $http.delete(hostUrl + '/photos/' + theId).then(function(resp) {});
    }
    $scope.edit = function(theId) {
      currentItemLookingId = theId;
      window.location = '#/menu/carsForm';
    }
  })
  .controller('PhotosMyListCtrl', function($scope, $http) {
    $http.get(hostUrl + '/photos?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['photos'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
  })
  //end object controllers
  .controller('MeCtrl', function($scope, $http) {
    $http.get(hostUrl + '/me?format=json').then(function(resp) {
      console.log('Success', resp);
      if (resp.data.status == 'fail') {
        if (localStorage.getItem('password') != null) {
          var password = localStorage.getItem('password');
          var email = localStorage.getItem('email');
          $http.post(hostUrl + '/users/session/?format=json', {
            'email': email,
            'password': password
          }).then(function(resp) {
            console.log('user logged in')
            console.log(resp)
          });
        } else {
          window.location = '#/intro'
        }
      } else {
        currentUserId = resp['data']['data']['passport']['user']
      }
      $scope.contents = resp['data']['profile']
        // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
  })
  .controller('BrowseCtrl', function($scope, $http) {
    $http.get(hostUrl + '/browses?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['browses'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
  })
  .controller('MyAccountCtrl', function($scope, $http) {
    $http.get(hostUrl + '/myAccounts?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['myAccounts'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
  })
  .controller('RecentlyViewedCtrl', function($scope, $http) {
    $http.get(hostUrl + '/recentlyVieweds?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['recentlyVieweds'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
  })
  .controller('SearchCtrl', function($scope, $http) {
    $http.get(hostUrl + '/searchs?format=json').then(function(resp) {
      console.log('Success', resp);
      $scope.contents = resp['data']['searchs'];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      console.error('ERR', err);
      // err.status will contain the status code
    })
  })
  //
  .controller('ProfileCtrl', function($scope, $http, $state) {
    $http.get(hostUrl + '/profiles?format=json').then(function(resp) {
      console.log('Success', resp);
      //$scope.profile = resp['data']['profiles'][0];
      $scope.contents._currentPage = window.location.href;
      // For JSON responses, resp.data contains the result
    }, function(err) {
      //console.error('ERR', err);
      $scope.profile = {
        _id: "5624842846ece7529c4f6e8a",
        "__v": 0,
        numRatings: 0,
        rating: 0,
        price: 0,
        updatedAt: "2015-10-19T05:48:24.806Z",
        createdAt: "2015-10-19T05:48:24.806Z",
        type: "Point",
        location: [-74.0059, 40.7127],
        media: [],
        authToken: "",
        salt: "130067613758",
        hashed_password: "95c4a8fcf6edecd64d71f597cfa2998210ab89fc",
        provider: "local",
        username: "Mike2",
        email: "m@codecloud.me",
        name: "Mike2"
      };
    })
    $scope.editProfile = function() {
      $state.go('menu.tabs.myAccount', {});
    };
  })
  //
  .controller('ProfileEditCtrl', function($scope, $http, $state) {
    $http.get(hostUrl + '/profiles?format=json').then(function(resp) {
      //console.log('Success', resp);
      //$scope.profile = resp['data']['profiles'][0];
      // For JSON responses, resp.data contains the result
    }, function(err) {
      //console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.profile = {
      _id: "5624842846ece7529c4f6e8a",
      "__v": 0,
      numRatings: 0,
      rating: 0,
      price: 0,
      updatedAt: "2015-10-19T05:48:24.806Z",
      createdAt: "2015-10-19T05:48:24.806Z",
      type: "Point",
      location: [-74.0059, 40.7127],
      media: [],
      authToken: "",
      salt: "130067613758",
      hashed_password: "95c4a8fcf6edecd64d71f597cfa2998210ab89fc",
      provider: "local",
      username: "Mike2",
      email: "m@codecloud.me",
      name: "Mike2"
    };
    $scope.saveProfile = function() {
      $state.go('.^', {});
    };
  })
  //
  .controller('CreditCardCtrl', function($scope, $http, $state) {
    $http.get(hostUrl + '/profiles?format=json').then(function(resp) {
      //console.log('Success', resp);
      //$scope.profile = resp['data']['profiles'][0];
      // For JSON responses, resp.data contains the result
    }, function(err) {
      //console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.card = {
      name: "Mike2",
      number: "4478 6632 9923 8890",
      exp_month: 08,
      exp_year: 2016,
      cvc: ""
    };
    $scope.saveCard = function() {
      $state.go('menu.profile', {});
    };
  })
  //
  .controller('CategoriesCtrl', function($scope, $http, $state) {
    $http.get(hostUrl + '/categories?format=json').then(function(resp) {
      //console.log('Success', resp);
      //$scope.profile = resp['data']['profiles'][0];
      // For JSON responses, resp.data contains the result
    }, function(err) {
      //console.error('ERR', err);
      // err.status will contain the status code
    })
    $scope.categories = [{
      name: "Categorie 1",
      description: "Navigate to this categorie",
      _id: 1111
        }, {
      name: "Categorie 2",
      description: "Navigate to this categorie",
      _id: 2222
        }];
  })
  //
  .controller('ProductsCtrl', function($scope, $http, $state) {
    $scope.products = [{
      name: "Product 1",
      description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
      _cat_id: 1111,
      _id: 1111
        }, {
      name: "Product 2",
      description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
      _cat_id: 1111,
      _id: 1112
        }, {
      name: "Product 3",
      description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
      _cat_id: 1111,
      _id: 1113
        }, {
      name: "Product 4",
      description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
      _cat_id: 2222,
      _id: 1114
        }, {
      name: "Product 5",
      description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
      _cat_id: 2222,
      _id: 1115
        }];
  })
  //
  .controller('ProductCtrl', function($scope, $http, $state) {
    $scope.items = [{
      src: 'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
      sub: 'This is a <b>subtitle</b>'
        }, {
      src: 'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg',
      sub: '' /* Not showed */
        }, {
      src: 'http://www.hdwallpapersimages.com/wp-content/uploads/2014/01/Winter-Tiger-Wild-Cat-Images.jpg',
      thumb: 'http://www.gettyimages.co.uk/CMS/StaticContent/1391099215267_hero2.jpg'
    }]
  })
  //
  .controller('PaymentCtrl', function($scope, $http, $state, $ionicPopup) {
    $scope.payment = {
      card: {
        name: "Mike2",
        number: 4478663299238890,
        exp_month: 08,
        exp_year: 2016,
        cvc: ""
      },
      products: [{
        name: 'Product 1',
        price: 11.99,
        img: 'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
        _cat_id: 1111,
        _id: 1111
        }, {
        name: 'Product 2',
        price: 0.99,
        img: 'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
        _cat_id: 1111,
        _id: 1112
        }, {
        name: 'Product 3',
        price: 12.99,
        img: 'http://www.wired.com/images_blogs/rawfile/2013/11/offset_WaterHouseMarineImages_62652-2-660x440.jpg',
        description: "Lorem ipsum Nisi et reprehenderit dolor voluptate nostrud Excepteur ut esse velit dolore nostrud ad mollit in irure consequat ut id proident elit commodo Duis dolor Ut.",
        _cat_id: 1111,
        _id: 1113
      }],
      user: {
        _id: "5624842846ece7529c4f6e8a",
        "__v": 0,
        numRatings: 0,
        rating: 0,
        price: 0,
        updatedAt: "2015-10-19T05:48:24.806Z",
        createdAt: "2015-10-19T05:48:24.806Z",
        type: "Point",
        location: [-74.0059, 40.7127],
        media: [],
        authToken: "",
        salt: "130067613758",
        hashed_password: "95c4a8fcf6edecd64d71f597cfa2998210ab89fc",
        provider: "local",
        username: "Mike2",
        email: "m@codecloud.me",
        name: "Mike2"
      }
    };
    $scope.sendPayment = function() {
      $ionicPopup.prompt({
        title: 'Confirm Payment?',
        template: 'Enter your secret CVC-code',
        inputType: 'password',
        inputPlaceholder: 'Your CVC'
      }).then(function(res) {
        if (res) {
          $state.go('menu.categories', {reload:true});
        }
      });
    }
  })
  //
  .controller('MapCtrl', function($scope, $http, $ionicLoading, $ionicHistory) {
    var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    navigator.geolocation.getCurrentPosition(function(pos) {
      map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
      var myLocation = new google.maps.Marker({
        position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
        map: map,
        title: "My Location"
      });
    });
    $scope.map = map;
    $scope.back = function () {
      $ionicHistory.goBack();
    };
    $scope.refresh = function () {
      $state.reload();
    };
  })
  //
  .controller('FilterCtrl', function($scope, $http, $ionicLoading, $ionicHistory) {
    $scope.filter = {
      enabled: {
        byDistance: false,
        byCity:false,
        byCountry:false
      },
      distance: [],
      country: [],
      city: [],
      priceRange : { // options for https://github.com/Yankovsky/nouislider-angular
        start: [20, 70],
        margin: 30,
        step: 10,
        //connect: true,
        range: {min: 0, max: 100},
        tooltips: true
      }
    };
    $scope.contents = [{
      "_id" : "567a35b3fab023a614b6cfbf",
      "user" : "56781048869309345c1dd592",
      "accessSecret" : "",
      "availabilitySlots" : [],
      "availableNow" : false,
      "startDate" : "2015-12-23T05:48:35.345Z",
      "email" : "",
      "numRatings" : 0,
      "rating" : 0,
      "price" : 125,
      "updatedAt" : "2015-12-23T05:48:35.345Z",
      "type" : "Point",
      "location" : [
        82.9357327000000026,
        55.0083525999999878
      ],
      "media" : [],
      "createdAt" : "2015-12-23T05:48:35.345Z",
      "image" : {
        "cdnUri" : "/uploads/7828345c6a36bccbc4692b56bdb78734.png",
        "files" : [
          {
            "buffer" : null,
            "truncated" : false,
            "size" : 19580,
            "extension" : "png",
            "path" : "/tmp/7828345c6a36bccbc4692b56bdb78734.png",
            "mimetype" : "image/png",
            "encoding" : "7bit",
            "name" : "7828345c6a36bccbc4692b56bdb78734.png",
            "originalname" : "8.png",
            "fieldname" : "image"
          }
        ]
      },
      "tags" : [
        "test",
        "again test",
        "sport",
        "games"
      ],
      "categories" : [],
      "likes" : [],
      "ratings" : [],
      "comments" : [],
      "body" : "\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"",
      "title" : "My first test article",
      "__v" : 0
    }];
  })

