$(function(){
  console.log("Jake Weary at your service");

  // $('.info-window').parent().css({"background-color": "red !important"})
  // console.log($('.info-window').parent().parent().parent().parent())

  // Add event listeners to forms
  $('.loginForm').on('submit', submitLoginRegisterForm);
  $('.logoutbtn').on('click', logout);
  $('.registerForm').on('submit', submitLoginRegisterForm);
  $('.userLocationForm').on('submit', submitLocationForm);
  $('.editPackageForm').on('submit', updatePackage)
  $('.package-link').on('click', showCreatePackage);
  $('.createPackageForm').on('submit', submitPackageForm);
  $('.userEditForm').on('submit', submitEditForm);
  $('.userEditLink').on('click', showEditForm);
  $('.manageDonationsLink').on('click', showManagePackages);
  $('.deletePackageButton').on('click', deletePackage);

  // Adding event listener to back button
  $('.backButton').on('click', loggedInState);

  // Add event listener to links
  $(".linkToRegister").click(function(){
    $('.loginForm').addClass('hidden');
    $('.registerForm').removeClass('hidden');
    $(this).addClass('hidden');
    $('.linkToLogin').removeClass('hidden');
    hideErrors();
  });

  $(".linkToLogin").click(function(){
    $('.loginForm').removeClass('hidden');
    $('.registerForm').addClass('hidden');
    $(this).addClass('hidden');
    $('.linkToRegister').removeClass('hidden');
    hideErrors();
  });

  // Create default map
  createMap(51.5072, -0.1275, 10);

  // Check login state
  checkLoginState();

  // Set initial state of menu
  initialMenuState();

  console.log($("#webmenu").imagepicker());


});

// GLOBAL VARIABLES

var map;
var currentInfoWindow;
var markers = [];

function initialMenuState(){
  $('.userEditForm').addClass('hidden');
  $('.user-packages').addClass('hidden');
}

function createMap(lat, lng, zoom){
  // Make a new map
  map = new google.maps.Map($('#map')[0], {
    // Pass in parameters to the map
    zoom: zoom,
    center: { lat: lat, lng: lng },
    disableDefaultUI: true,
    styles: [
    {
        "featureType": "administrative.locality",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f5f5f5"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "gamma": "1.68"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "-65"
            },
            {
                "lightness": "45"
            },
            {
                "gamma": "1.78"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#00ff1c"
            },
            {
                "saturation": "18"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
            {
                "weight": "1"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry",
        "stylers": [
            {
                "gamma": "2.08"
            },
            {
                "hue": "#ffa200"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "simplified"
            },
            {
                "saturation": "30"
            },
            {
                "lightness": "-2"
            },
            {
                "gamma": "1.88"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#a9d9ec"
            },
            {
                "visibility": "simplified"
            }
        ]
    }
]

  });
}

function createMarkers(packages){
  console.log("DATA FROM GET MARKERS AJAX REQUEST: ",packages);
  removeAllMarkers();

  packages.forEach(function(package){
    var position = { lat: package.lat, lng: package.lng }

    // console.log("MARKER POSITION: " + position.lat + " " + position.lng);

    var marker = new google.maps.Marker({
      position: position,
      map: map,
      animation: google.maps.Animation.DROP
    });

    markers.push(marker);

    console.log("Package contents from db:",package.contents);

    var logos = "";

    // Loop through package contents, find each icon and add to logos string
    for(var i = 0; i < package.contents.length; i++){
      var contents = package.contents[i];

      switch(contents){
        case "fruit and veg":
        logos = logos + "<img class='logo' src='/food-icons/png/fruit-1.png'>"
        break;
        case "meat and fish":
        logos = logos + "<img class='logo' src='/food-icons/png/food-1.png'>"
        break;
        case "dairy and eggs":
        logos = logos + "<img class='logo' src='/food-icons/png/food-6.png'>"
        break;
        case "baked goods":
        logos = logos + "<img class='logo' src='/food-icons/png/food-5.png'>"
        break;
        case "staples":
        logos = logos + "<img class='logo' src='/food-icons/png/food-7.png'>"
        break;
      }
      console.log("logos", logos);
    }

    var infoWindow = new google.maps.InfoWindow({
      position: position,
        content: '<div class="infoWindow">' + "<div class='infoWindowTopBar'>" + logos + "</div><br><strong>Collection Time:   </strong>"+ package.collection_time + '<br><strong>Notes:   </strong>' + package.note + '</br>' +
        '<br><strong>Contact Details:   </strong>' + package.contact + '</br></div>'
    });

    marker.addListener('click', function() {
      if(currentInfoWindow) currentInfoWindow.close();
        currentInfoWindow = infoWindow;
        infoWindow.open(map, marker);
        // Log infowindow containers
        removeInfoWindowBg();
      });
    });
}

function removeInfoWindowBg(){
  var $iwOuter = $('.gm-style-iw');

  console.log($iwOuter);
  console.log($iwOuter.length);

  $iwOuter.prev().children(':nth-child(2n)').hide();


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

  markers.push(marker);

  console.log("Package contents from db:",package.contents);

  var logos = "";

  // Loop through package contents, find each icon and add to logos string
  for(var i = 0; i < package.contents.length; i++){
    var contents = package.contents[i];

    switch(contents){
      case "fruit and veg":
      logos = logos + "<img src='/food-icons/png/fruit-1.png'>"
      break;
      case "meat and fish":
      logos = logos + "<img src='/food-icons/png/food-1.png'>"
      break;
      case "dairy and eggs":
      logos = logos + "<img src='/food-icons/png/food-6.png'>"
      break;
      case "baked goods":
      logos = logos + "<img src='/food-icons/png/food-5.png'>"
      break;
      case "staples":
      logos = logos + "<img src='/food-icons/png/food-7.png'>"
      break;
    }
    console.log("logos", logos);
  }

  var infoWindow = new google.maps.InfoWindow({
    position: position,

      content: '<div class="info-window">' + logos + '<br>' + package.note + '</br>' +
      '<br>' + package.contact + '</br></div>'
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

function logout(){
  removeToken();
  loggedOutState();

  // Create default map
  createMap(51.5072, -0.1275, 10);
}

function removeToken() {
  // remove the token from localStorage
  return localStorage.removeItem('token');
}

function submitLoginRegisterForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault(); // not to reload the page with the form

  var form = this; // to clear the form

  // console.log(form);

  var method = $(this).attr('method'); // attribute to the form the right method
  var url = "/api" + $(this).attr('action'); //post to this url and do this action
  var data = $(this).serialize(); // we don't use json because we have put url encoded in our app.js // the data sort like name=Mike&email=mike.hayden@ga.co

  ajaxRequest(method, url, data, authenticationSuccessful);
}

function submitLocationForm(){

    event.preventDefault();

    // console.log("Location form submitted");

    var form = this;

    var method = $(this).attr('method');
    var url = "/api" + $(this).attr('action');

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

function populateEditForm(){
  // event.preventDefault();
  // if(getToken()) {
  $("#webmenu1").imagepicker();

    var method = 'GET';
    var user = currentUser();

    var url = "/api/users/" + user._id;
    ajaxRequest(method, url, null, function(data) {
      var user = data.user;
        $('.editUsername').val(user.username);
        $('.editEmail').val(user.email);
        $('.editAvatar').val(user.avatar);
    });
  // }
  // else {
  //   console.log("No token found, not populating edit form");
  // }
}

function submitEditForm(){
  event.preventDefault();

  var method = 'PUT';
  var user = currentUser(); // attribute to the form the right methode
  console.log("USER ID: " + user._id);
  var url = "/api/users/" + user._id; //post to this url and do this action
  var data = $(this).serialize(); // we don't use json because we have put url encoded in our app.js // the data sort like name=Mike&email=mike.hayden@ga.co

  this.reset();
  ajaxRequest(method, url, data, loggedInState);
}


function submitPackageForm(){

  event.preventDefault();

  var $form = $(this);

  var user = currentUser();
  console.log("New package user id: " + user._id);

  var method = $(this).attr('method');
  var url = "/api" + $(this).attr('action');
  var postcode = $('.newPackagePostcode').val();

  // GEOCODE POSTCODE FROM NEW PACKAGE
  var geocoder = new google.maps.Geocoder();

  geocoder.geocode({ 'address': postcode }, function(results, status){
    if(status === google.maps.GeocoderStatus.OK) {

      var lat = results[0].geometry.location.lat();
      var lng = results[0].geometry.location.lng();
      console.log($form.find('select.image-picker').val());

      var data = { "package": {
        user: user,
        contents: $form.find('select.image-picker').val(),
        note: $('.packageNote').val(),
        contact: $('.packageContact').val(),
        collection_time: $('.preferredTime').val(),
        lat: lat,
        lng: lng
        }
      }

      // var package = {
      // user: user,
      // contents: $form.find('select.image-picker').val(),
      // note: $('.packageNote').val(),
      // contact: $('.packageContact').val(),
      // lat: lat,
      // lng: lng
      // }

      var position = { lat: data.package.lat, lng: data.package.lng }

      map.panTo(position);
      map.setZoom(15);

      console.log("SUBMITTED NEW PACKAGE DATA: ", data);
      console.log("New package lat and lng: " + data.package.lat + ", " + data.package.lng);

      // Make request to API to add package and create new pin as callback
      ajaxRequest("post", url, data, createMarker);

      $form[0].reset();
      loggedInState();
    }
  });
}

function removeAllMarkers(){
  for(var i = 0; i<markers.length; i++){
    markers[i].setMap(null);
  }
  markers = [];
}

function loggedInState(){
  $('.loginContainer').hide();
  $('.backButton').hide();
  $('.packageForm').hide();
  $('.userEditForm').hide();
  $('.formContainer').show();
  $('.menuContainer').show();
  hideErrors();
  $('#loadingImage').fadeOut(3000);
  console.log($("#webmenu").imagepicker());
  $('.logoutbtn').show();
  $('.user-packages').hide();
  $('.editPackageForm').hide();
  $('.deletePackageButton').addClass('hidden');

  // Test edit form population functionality
  populateEditForm();

    // Make request for markers from DB
  ajaxRequest("get", "/api/packages", null, createMarkers);
  }

function currentUser() {
  var token = getToken();
  if(token){
    var payload = token.split('.')[1];
    payload = window.atob(payload);
    payload = JSON.parse(payload);
    console.log("PAYLOAD: " + payload);
    console.log("PAYLOAD USER ID: " + payload._id);
    return payload;
  }
}


function loggedOutState(){
  $('.loginContainer').show();
  $('.loginForm').removeClass('hidden');
  $('.userLocationForm').addClass('hidden');
  $('.formContainer').hide();
  $('.logoutbtn').hide();
  $('.linkToRegister').removeClass('hidden');
  $('#loadingImage').fadeIn(1500);
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
    hideErrors();
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
    .fail(displayErrors);
  }

function removeToken() {
    // remove the token from localStorage
    return localStorage.removeItem('token');
}

function showCreatePackage() {
  $('.createPackageForm')[0].reset();
  $('.menuContainer').hide();
  $('.packageForm').show();
  $('.navbarButton').show();
}

function showManagePackages(){
  $('.menuContainer').hide();
  $('.userEditForm').hide();
  $('.navbarButton').show();
  $('.user-packages').removeClass('hidden');
  $('.user-packages').show();

  // Get user id
  var user = currentUser();

  // Populate user-packages
  ajaxRequest("POST", "/api/userPackages", user, populatePackages);
}

function populatePackages(data) {
  $('.user-packages').empty();
  console.log(data.packages);
  data.packages.forEach(function(package){
    console.log("PACKAGE CONTENTS: " + package.contents);
    $('.user-packages').append("<button name='" + package.lat +","+ package.lng + "' class='packageEditButton' id='" + package._id + "'>" + package.contents + "</button>");
  });
  addEventListenersToPackages();
}

function addEventListenersToPackages(){
  var packageEditButtons = $('.packageEditButton');

  for(var i = 0; i < packageEditButtons.length; i++) {
    packageEditButtons[i].addEventListener('click', function(){
      console.log(this.id);
      populatePackageEditForm(this.id);

      console.log("Clicked package position: " + this.name.split(',')[0]);

      var position = { lat: parseFloat(this.name.split(',')[0]), lng: parseFloat(this.name.split(',')[1])}

      // Pan map to marker
      map.panTo(position);
      map.setZoom(15);

      // Hide all other edit buttons on click
       $('.packageEditButton').not('#' + this.id).hide();

      // Handle view hiding/showing
      $('.editPackageForm').removeClass('hidden');
      $('.editPackageForm').show();
      $('.deletePackageButton').removeClass('hidden');
      $("#" + this.id).addClass('hidden');
    });
  }
}

function populatePackageEditForm(packageId){

  var method = 'GET';
  var url = "/api/packages/" + packageId;

  ajaxRequest(method, url, null, function(data) {
    var package = data.package;
    console.log("PACKAGE: "+ package.note)
    console.log("POPULATE PACKAGE EDIT DATA: ", package.contact);
    $('.editPackageNote').empty();
    $('.editPackageNote').html(package.note);
    $('.editPackageContent').val(package.contents);
    $('.editPackageContact').val(package.contact);
    $('.editPackageId').val(package._id);
  });
}

function updatePackage(){

  event.preventDefault();

  var user = currentUser();
  var packageId = $('.editPackageId').val();

  console.log("Collection time from update form: ", $('.editPreferredTime').val());


  var data =
    {
      package: {
      user: user,
      contents: $('.editPackageContent').val(),
      note: $('.editPackageNote').val(),
      contact: $('.editPackageContact').val(),
      collection_time: $('.editPreferredTime').val()
      }
    }


  var method = "patch";
  var url = "/api/packages/" + packageId;

  ajaxRequest(method, url, data, function(){

    ajaxRequest("get", "/api/packages", null, createMarkers);
  });

  //Return to main menu
  loggedInState();
}

function deletePackage(){
  var packageId = $('.editPackageId').val();
  var method = "delete";
  var url = "/api/packages/" + packageId;

  ajaxRequest(method, url, null, createMarkers);
  loggedInState();
}

function showEditForm(){
  $('.menuContainer').hide();
  $('.userEditForm').show();
  $('.navbarButton').show();
}

 function displayErrors(data){
  console.log(data);
  console.log("errors are displaying");
  console.log('.alert');
  $('.alert').removeClass("hidden");
  $('.alert').empty();
  $('.alert').append(data.responseJSON.message);
}

function hideErrors(){
  console.log("errors are hidden");
  // remove the errors from the alert and hide it
  $('.alert').addClass("hidden");
  // empty removes all of the html.
  $('.alert').empty();
}
