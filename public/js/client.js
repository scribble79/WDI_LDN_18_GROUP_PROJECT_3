$(function(){
  console.log("Jake Weary at your service");

  // Add event listeners to forms
  $('.loginForm').on('submit', submitLoginRegisterForm);
  $('.registerForm').on('submit', submitLoginRegisterForm);
  $('.userLocationForm').on('submit', submitLocationForm);
  $('.package-link').on('click', showCreatePackage);
  $('.createPackageForm').on('submit', submitPackageForm);

  // Add event listener to links
  $(".linkToRegister").click(function(){
    $('.loginForm').addClass('hidden');
    $('.registerForm').removeClass('hidden');
    $(this).addClass('hidden');
    $('.linkToLogin').removeClass('hidden');
  });

  $(".linkToLogin").click(function(){
    $('.loginForm').removeClass('hidden');
    $('.registerForm').addClass('hidden');
    $(this).addClass('hidden');
    $('.linkToRegister').removeClass('hidden');
  });

  // Create map
  createMap(51.5072, -0.1275, 10);

  // Check login state
  checkLoginState();

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

function createMarker(package){
  console.log("DATA FROM GET MARKER AJAX REQUEST: " + package);
  console.log(package.lng);

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

        var location = {
          userId: user._id,
          lng: lng,
          lat: lat
        }

        // Create map, centered on location entered
        createMap(location.lat, location.lng, 15);

        // Make request to API to add location to user
        ajaxRequest("patch", url, location, authenticationSuccessful);

        // Show correct containers
        checkLoginState();
      }
    });
  }

function submitPackageForm(){

  event.preventDefault();

  var form = this;

  // var user = currentUser();
  var method = $(this).attr('method');
  var url = "http://localhost:3000/api" + $(this).attr('action');
  var postcode = $('.newPackagePostcode').val();

  // GEOCODE POSTCODE FROM NEW PACKAGE
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': postcode }, function(results, status){
    if(status === google.maps.GeocoderStatus.OK) {

      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      console.log(lat,lng);

      var package = {
        contents: $('.packageContent').val(),
        note: $('.packageNote').val(),
        contact: $('.packageContact').val(),
        lat: lat,
        lng: lng
      }

      var position = { lat: package.lat, lng: package.lng }

      console.log("SUBMITTED NEW PACKAGE DATA: " + package);
      console.log("New package lat and lng: " + package.lat + ", " + package.lng);

      // Make request to API to add package and create new pin as callback
      ajaxRequest("post", url, package, createMarker);
    }
  });
}

function loggedInState(){
  $('.loginContainer').hide();
  $('.formContainer').show();
  // Make request for markers from DB
  ajaxRequest("get", "http://localhost:3000/api/packages", null, createMarkers);
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
    // checkLoginState();
    $('.loginForm').addClass('hidden');
    $('.registerForm').addClass('hidden');
    $('.userLocationForm').removeClass('hidden');
    $('.linkToLogin').addClass('hidden');
    $('.linkToRegister').addClass('hidden');
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

function showCreatePackage() {
  $('.menuContainer').hide();
  $('.packageForm').show();
}
