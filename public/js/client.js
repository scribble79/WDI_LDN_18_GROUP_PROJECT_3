$(function(){
  console.log("Jake Weary at your service");
  $('form').on('submit', submitForm);
  createMap();

  ajaxRequest("get", "http://localhost:3000/api/packages", null, createMarkers);
});

// GLOBAL VARIABLES

var map;
var currentInfoWindow;

function createMap(){
  // Make a new map
  map = new google.maps.Map($('#map')[0], {
    // Pass in parameters to the map
    zoom: 12,
    center: { lat: 51.506178, lng: -0.088369 },
    disableDefaultUI: true
  });
}

function createMarkers(packages){
  console.log("DATA FROM GET MARKERS AJAX REQUEST: " + packages);
  console.log(packages[0].lng);

  packages.forEach(function(package){
    var position = { lat: package.lat, lng: package.lng }

    // console.log("MARKER POSITION: " + position.lat + " " + position.lng);

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    });

    var infoWindow = new google.maps.InfoWindow({
      position: position,
      content: package.contents[0],

    });

      marker.addListener('click', function() {
      // console.log('Clicked marker');
        if(currentInfoWindow) currentInfoWindow.close();
          currentInfoWindow = infoWindow;
          infoWindow.open(map, marker);
        });
    });
  
}



////// AUTHENTICATIONS REQUEST ////////

function submitForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault(); // not to reload the page with the form 

  var form = this; // to clear the form

  var method = $(this).attr('method'); // attribute to the form the right methode
  var url = "http://localhost:3000/api" + $(this).attr('action'); //post to this url and do this action
  var data = $(this).serialize(); // we don't use json because we have put url encoded in our app.js // the data sort like name=Mike&email=mike.hayden@ga.co

  form.reset(); // to clear the form
  ajaxRequest(method, url, data, authenticationSuccessful);
  }


function authenticationSuccessful(data) {
    // set the token and call checkLoginState
    if(data.token) setToken(data.token);

  }

function setToken(token) {
    // set the token into localStorage
    return localStorage.setItem('token', token);

  }

function getToken() {
    // get the token from localStorage
    return localStorage.getItem('token');
  }


function ajaxRequest(method, url, data, callback) {
    // create a re-useable ajaxRequest function
      return $.ajax({
        method: method,
        url: url,
        data: data,
        beforeSend: function(jqXHR, settings) {
          var token = getToken();
          if(token) return jqXHR.setRequestHeader('Authorization', 'Bearer ' + token);
        }
      })
      .done(callback)
      .fail(function(err) {
      console.error(err);
    });
}

function logout(){
  // remove the token
  removeToken();
}

function removeToken() {
    // remove the token from localStorage
    return localStorage.removeItem('token');
}

