$(function(){
  console.log("Jake Weary at your service");
  $('form').on('submit', submitForm);
  createMap();
});

function createMap(){
  // Make a new map
  map = new google.maps.Map($('#map')[0], {
    // Pass in parameters to the map
    zoom: 12,
    center: { lat: 51.506178, lng: -0.088369 },
    disableDefaultUI: true
  });
}


////// AUTHENTICATIONS REQUEST ////////

function submitForm(){
  // get the data from the forms and make an ajaxRequest
  // call authenticationSuccessful
  event.preventDefault(); // not to reload the page with the form

  var form = this; // to clear the form

  console.log(form);

  var method = $(this).attr('method'); // attribute to the form the right methode
  var url = "http://localhost:3000/api" + $(this).attr('action'); //post to this url and do this action
  var data = $(this).serialize(); // we don't use json because we have put url encoded in our app.js // the data sort like name=Mike&email=mike.hayden@ga.co

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
      .fail(displayErrors);
  }


function logout(){
  // remove the token
  removeToken();
}

function removeToken() {
    // remove the token from localStorage
    return localStorage.removeItem('token');
}
<<<<<<< HEAD

function displayErrors(data){
  // display the errors from the AJAX request on the page, inside the alert
  // <div class="hide alert alert-danger" role="alert"></div>
    $('.alert').html('<p>' + data.responseJSON.message + '</p>');
}
=======
>>>>>>> dev
