$(function(){
  console.log("Jake Weary at your service");

  // Add event listeners to forms
  $('.loginForm').on('submit', submitLoginRegisterForm);
  $('.registerForm').on('submit', submitLoginRegisterForm);
  $('.userLocationForm').on('submit', submitLocationForm);

  // Create map
  createMap();

  // Check login state
  checkLoginState();

  // // Make request for markers from DB
  // ajaxRequest("get", "http://localhost:3000/api/packages", null, createMarkers);
});

// GLOBAL VARIABLES

var map;
var currentInfoWindow;

function createMap(lat, lng, zoom){
  // Make a new map
  map = new google.maps.Map($('#map')[0], {
    // Pass in parameters to the map
    zoom: zoom,
    center: { lat: lat, lng: lng },
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

function checkLoginState(){
  if(getToken()){
    loggedInState();
  } else{
    loggedOutState();
  }
}

function submitLoginRegisterForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault(); // not to reload the page with the form

  var form = this; // to clear the form

  // console.log(form);

  var method = $(this).attr('method'); // attribute to the form the right method
  var url = "http://localhost:3000/api" + $(this).attr('action'); //post to this url and do this action
  var data = $(this).serialize(); // we don't use json because we have put url encoded in our app.js // the data sort like name=Mike&email=mike.hayden@ga.co

  ajaxRequest(method, url, data, authenticationSuccessful);
}

function submitLocationForm(){

    event.preventDefault();

    // console.log("Location form submitted");

    var form = this;

    var method = $(this).attr('method');
    var url = "http://localhost:3000/api" + $(this).attr('action');

    var postcode = $('.userPostcode').val()

    // console.log("Location form data: " + postcode);

    var user = currentUser();

    // Make geoCoder request
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode({ 'address': postcode }, function(results, status){
      if(status === google.maps.GeocoderStatus.OK) {

        var lat = results[0].geometry.location.lat();
        var lng = results[0].geometry.location.lng();
        console.log(lat,lng);
        // console.log("Geometry keys: " + Object.keys(results[0].geometry.location));

        // console.log("Location coordinates: " + coordinates);
        // console.log("TYPE OF COORDINATES DATA " + $.type(coordinates));
        // console.log("Location coordinates: " + results[0].geometry.location.lng);
        var location = {
          userId: user._id,
          lng: lng,
          lat: lat
        }

        // Create map, centered on location entered
        createMap(location.lat, location.lng, 15);
        // Make request for markers from DB
        ajaxRequest("get", "http://localhost:3000/api/packages", null, createMarkers);


        // Make request to API to add location to user
        ajaxRequest("patch", url, location, authenticationSuccessful);
      }
    });
  }

function loggedInState(){
  // $('.loginContainer').hide();
  $('.formContainer').show();
  // getUsers();
}

function currentUser() {
  var token = getToken();
  var payload = token.split('.')[1];
  payload = window.atob(payload);
  payload = JSON.parse(payload);
  console.log("PAYLOAD: " + payload);
  console.log("PAYLOAD USER ID: " + payload._id);
  return payload;
}


function loggedOutState(){
  $('.loginContainer').show();
  $('.formContainer').hide();
}

function authenticationSuccessful(data) {
    // set the token and call checkLoginState
    if(data.token) setToken(data.token);

    // Show and hide the appropriate panels
    checkLoginState();
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
      .fail(function(){
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
