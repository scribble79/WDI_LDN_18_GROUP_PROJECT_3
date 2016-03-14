$(function(){
  console.log("Jake Weary at your service");
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
