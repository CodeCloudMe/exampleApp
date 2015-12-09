
var map;

function initMap() {
    if (navigator.geolocation) {

        console.log(navigator.geolocation);
        //return;
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        //navigator.geolocation.getCurrentPosition(showPosition);
        var theLocation = {'position':coords};
        theLocation.coords={};
        theLocation.coords = {'latitude':-34.397, 'longitude':150.644 }
        console.log('didnt get location')
        userLocation = [-34.397, 150.644];
        showMap(-34.397, 150.644, false);
    
    }

}


function initMap1() {
    if (navigator.geolocation) {

        console.log(navigator.geolocation);
        //return;
        navigator.geolocation.getCurrentPosition(showPosition1);
    } else {
        //navigator.geolocation.getCurrentPosition(showPosition1);
        var theLocation = {'position':coords};
        theLocation.coords={};
        theLocation.coords = {'latitude':-34.397, 'longitude':150.644 }
        console.log('didnt get location')
        userLocation = [150.644, -34.397]
        showMap1(-34.397, 150.644, false);
        
    }

}



function showPosition(position) {
    
  
    userLocation = [position.coords.latitude, position.coords.longitude];
    showMap(position.coords.latitude, position.coords.longitude, true)
}


function showLoading(){

    $('.loader-wrapper').show();
}

function hideLoading(){

    $('.loader-wrapper').hide();
}

function showPosition1(position) {
    
    
    userLocation = [position.coords.latitude, position.coords.longitude];
    showMap1(position.coords.latitude, position.coords.longitude, true)
}


function showMap1(lat, lon, doWeHave) {

   

    doWeHaveLocation(doWeHave);
    $('#map1').css({'height':screen.height});

    $('#map1').css({'width':screen.width});

     myLocation= {'lat': lat, 'lng':lon}
      map1 = new google.maps.Map(document.getElementById('map1'), {
        center: myLocation,
        zoom: 15
      });

    selfMarkerImg= 'images/marker.png'
     var mySelfMarker = new google.maps.Marker({
        position: myLocation,
        'map': map1,
        draggable: true,
        title: 'My Location',
        visible:true,
         icon: selfMarkerImg
    });

     mySelfMarker.setMap(map1);

      showNearbyCarsDemo(lat, lon, map1);

      setTimeout(function(){
        hideLoading()
      }, 1000)


}


function showMap(lat, lon, doWeHave) {

    
    doWeHaveLocation(doWeHave);
    $('#map').css({'height':screen.height});

    $('#map').css({'width':screen.width});

    myLocation = {'lat': lat, 'lng':lon};
  map = new google.maps.Map(document.getElementById('map'), {
    center: myLocation,
    zoom: 15
  });

    selfMarkerImg= 'images/marker.png'
     var mySelfMarker = new google.maps.Marker({
        position: myLocation,
        'map': map,
        draggable:true,
        icon:selfMarkerImg,
        title: 'My Location',
        visible:true
    });

     mySelfMarker.setMap(map);

      showNearbyCarsDemo(lat, lon, map);


      setTimeout(function(){
        hideLoading()
      }, 7000)


}

    function showNearbyCarsDemo(lat, lon ,whichMap){

         carMarkerImg= 'images/carMarker.png'
         var nearbyCars = [];
        for(i=0; i<8; i++){
            var ranNum = (Math.random() * (0.01 - 0.001) + 0.001)
            if(i%3){
                demoLat = lat+ ranNum;
                demoLon = lon-ranNum;
            }
            else if(i%2){
                 demoLat = lat+ ranNum;
                demoLon = lon+ranNum;
            }
            else{
                 demoLat = lat- ranNum;
                demoLon = lon+ranNum;
            }
            
            var carLocation= {'lat':demoLat, 'lng':demoLon}

             nearbyCars[i] = new google.maps.Marker({
                position: carLocation,
                'map': whichMap,
                
                icon:carMarkerImg,
                title: 'Nearby Driver',
                visible:true
            });

     nearbyCars[i].setMap(whichMap);


        }
    }


function doWeHaveLocation(bool){

    switch(bool){

        case true:
            console.log('use gave location');
        break;


        case false:
            console.log('user didnt give location. guess');
        break;
    }
}


function getLonLat(placeName, completeFunc){

    var geo = new google.maps.Geocoder;
geo.geocode({'address':placeName},function(results, status){
    if (status == google.maps.GeocoderStatus.OK) {              
        var myLatLng = results[0].geometry.location;
        completeFunc(myLatLng);
        // Add some code to work with myLatLng              

    } else {
        completeFunc(false)
        console.log("Geocode was not successful for the following reason: " + status);
    }
});
}








//end map logic


//login/out view logic


function toggleLogout(){


    $('#loginButton').html('Logout');
    $('#registerButton').hide();
}


function toggleLogin(){


    $('#loginButton').html('Login');
    $('#registerButton').show();
}

