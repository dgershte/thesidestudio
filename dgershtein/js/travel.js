currentLocation = new Array();
currentMarkers = new Array();
mapView = true;

/******************************************************************************/
/*							GOOGLEMAPS										  */
/******************************************************************************/
 
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
google.maps.visualRefresh = true;



function initialize() {
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = {
	  center: NewZealandLocations.auckland,
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	map = new google.maps.Map(document.getElementById("map-canvas"),
	mapOptions);
	directionsDisplay.setMap(map);
	createMarkers(NewZealandLocations,NewZealandMarkers);
	currentMarkers = NewZealandMarkers;
	calcRoute();	
	MyOverlay.prototype = new google.maps.OverlayView();
	MyOverlay.prototype.onAdd = function() { }
	MyOverlay.prototype.onRemove = function() { }
	MyOverlay.prototype.draw = function() { }
	function MyOverlay(map) { this.setMap(map); }

	var overlay = new MyOverlay(map);
	projection = null;

	google.maps.event.addListener(map, 'idle', function() {	
		projection = overlay.getProjection();
		console.log("x");
	});
}

function createMarkers(country, markers) {
	for(city in country) {
		var marker = new google.maps.Marker({
			position: country[city],
			map:map,
			animation: google.maps.Animation.DROP,
			title: ""+city
		});
		google.maps.event.addListener(marker, 'click', function() {
			$("#map-canvas").animate({
				width: '0',
				}, 1000, function () {
				google.maps.event.trigger(map, 'resize');
				currentLocation = marker.getPosition();
			});
			//dropMarkers();
		});
		markers.push(marker);
		marker.setMap(map);
	}
	
}

function updateLocation() {
	map.setCenter(currentLocation);		
}

function calcRoute() {
	var waypts = [];
    for (city in NewZealandLocations) {
    	waypts.push({
        	location:NewZealandLocations[city],
        	stopover:true});
    }
	var request = {
		origin: NewZealandLocations.waitomo,
		destination: NewZealandLocations.auckland,
		waypoints: waypts,
		optimizeWaypoints: true,
		travelMode: google.maps.TravelMode.DRIVING  
	};
  directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    }
  });
}
/******************************************************************************/
/*							GALLERY											  */
/******************************************************************************/



function addSlide(src) {
	var li = document.createElement('li');
	var img = document.createElement('img');
	img.src = src;
	li.appendChild(img);
	return li;
}


function createSlider(images) {
	for(image in images) {
		$("#travelslider").append(addSlide(images[image]));
	}
}

function switchSliderContent(images){
	var numSlides = slider.count;
	for(image in images) {
		slider.addSlide('<li><img src="'+images[image]+'" /></li>');
	}
	for(var i = 0; i < numSlides; i++){
		slider.removeSlide(0);
	}
}

function bindActions() {
	$("#tripicons #newzealand").bind( "click", function() {
		switchSliderContent(NewZealandImages);
		changeMap(NewZealandLocations, NewZealandMarkers);
	});
	$("#tripicons #australia").bind( "click", function() {
		switchSliderContent(AustraliaImages);
		changeMap(AustraliaLocations, AustraliaMarkers);
	});
	$("#tripicons #singapore").bind( "click", function() {
		switchSliderContent(SingaporeImages);
		changeMap(SingaporeLocations, SingaporeMarkers);
	});
	$("#tripicons #thailand").bind( "click", function() {
		switchSliderContent(ThailandImages);
		changeMap(ThailandLocations, ThailandMarkers);
	});
	$("#tripicons #cambodia").bind( "click", function() {
		switchSliderContent(CambodiaImages);
		changeMap(CambodiaLocations, CambodiaMarkers);
	});
	$("#tripicons #indonesia").bind( "click", function() {
		switchSliderContent(IndonesiaImages);
		changeMap(IndonesiaLocations, IndonesiaMarkers);
	});
	$('#location').click(function() {
     $("#map-canvas").animate({
        width: '100%',
     }, 1000, function () {
		google.maps.event.trigger(map, 'resize');
    	updateLocation(); 
		$(".flexslider").flexslider("pause");
	});
});
}	

function removeMarkers(markers) {
	for(marker in markers) {
		markers[marker].setMap(null);
	}
}

function changeMap(country, markers) {
	if(markers.length == 0) {
		createMarkers(country, markers);
	}	
	removeMarkers(currentMarkers);
	currentMarkers.length = 0;
	currentMarkers = markers;
	map.panTo(markers[0].getPosition())
}

function dropMarkers() {
	var p = projection.fromLatLngToContainerPixel(NewZealandMarkers[0].getPosition());

	var navControls = $("#navControls");
	var li = document.createElement("li"); 
	var img = document.createElement("img");
	var offset = $("#header").height();
	img.src = "images/marker.png";
	$(li).css({"left":p.x,"top":p.y-offset});
	$(li).append(img);
	$(navControls).append(li);
	//$(li).css("top","400px");
}


$( document ).ready(function() {
	loadMenu();
	initialize();
	createSlider(NewZealandImages);
	locationicon = "images/location.png",
    $('.flexslider').flexslider({
    	animation: "slide",
        start: function(slider){
          $('body').removeClass('loading');
        },
    	after: function(slider) {
        	$('.current-slide').text(slider.currentSlide);
      	} , 
		smoothHeight: true,
	});
	slider = $('.flexslider').data('flexslider');
	bindActions();
	var fade_out = function() {
  		$("#welcome").fadeOut().empty();
	}
	setTimeout(fade_out, 10000);
});
