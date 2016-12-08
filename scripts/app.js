// define globals


//USGS Earthquake data
var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";

$(document).on("ready", function() {
//Grab USGS data
  $.ajax({
     method: 'GET',
     url: weekly_quakes_endpoint,
     data: $('body').serialize(),
     dataType: 'JSON',
     success: onSubmitReqSuccess

  }); //Ajax ends

  function onSubmitReqSuccess (responseData){
    console.log("Success!", responseData);
    //Set up Handlebars
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 37.78, lng: -122.44},
      zoom: 1
    });
    var source = $('#info-template').html();

    var template = Handlebars.compile(source);
    //Convert time data and inject it into HTML document
    responseData.features.forEach(function (earthQ) {
      var lngLat = {
        lng: earthQ.geometry.coordinates[1],
        lat: earthQ.geometry.coordinates[0]
      }
        var now = Date.now();
        var eqTime = earthQ.properties.time;
        var timeEquasion = (((now - eqTime)/86400000)*24);
        var earthquakeHtml = template({title : earthQ.properties.title, time: Math.round(timeEquasion)});
        $('#info').append(earthquakeHtml);
        marker = new google.maps.Marker({
         map: map,
         position: lngLat
       });
    });
    // initMap();
  }

});
// function initMap() {
//        var uluru = {lat: 37.78, lng: -122.44};
//        var map = new google.maps.Map(document.getElementById('map'), {
//          zoom: 4,
//          center: uluru
//        });
//        var marker = new google.maps.Marker({
//          position: uluru,
//          map: map
//        });
//      }


//API Key for Google Maps = AIzaSyB4vSX9T4soW_LEStFBLKWOpKPQlZbCYmI
//JS API Key AIzaSyB4vSX9T4soW_LEStFBLKWOpKPQlZbCYmI
