/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	window.onResize = function (width) {
		console.log(width);
	};

	window.enterView = function (msg) {
		console.log('enter-view');
	};

/***/ })
/******/ ]);
;const isMobile = window.innerWidth < 500 ? true : false,
	      zoom = isMobile ? 5 : 4;

const map = L.map('hurricane-map', {
			zoom: zoom,
			center: [34.7171946,-77.483072]
	});

	L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://carto.com/attributions">Carto</a>',
			minZoom: 5,
			maxZoom: 15
	}).addTo(map);

map.scrollWheelZoom.disable();

var geojsonMarkerOptions = {
    radius: 5,
    fillColor: "red",
    color: "#000",
    weight: 100,
    opacity: 100,
    fillOpacity: 1.0
};

var markIcon_hurricane2 = new L.Icon({
     iconSize: [18, 18],
     iconAnchor: [9, 12],
     popupAnchor:  [1, -15],
     iconUrl: './assets/bullseye_hurricane2.png'
 });

 var markIcon_hurricane1 = new L.Icon({
      iconSize: [18, 18],
      iconAnchor: [9, 12],
      popupAnchor:  [1, -15],
      iconUrl: './assets/bullseye_hurricane1.png'
  });

  var markIcon_tropicalstorm = new L.Icon({
	   iconSize: [18, 18],
	   iconAnchor: [9, 12],
	   popupAnchor:  [1, -15],
	   iconUrl: './assets/bullseye_tropicalstorm.png'
   });

   var markIcon_tropicaldep = new L.Icon({
	  iconSize: [18, 18],
	  iconAnchor: [9, 12],
	  popupAnchor:  [1, -15],
	  iconUrl: './assets/bullseye_tropicaldep.png'
	});

	var markIcon_subtopdep = new L.Icon({
	   iconSize: [18, 18],
	   iconAnchor: [9, 12],
	   popupAnchor:  [1, -15],
	   iconUrl: './assets/bullseye_subtopdep.png'
	 });

 function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.TCDVLP) {
        layer.bindPopup(feature.properties.TCDVLP );
    }
}


	$.getJSON('./assets/florence.json', function (data) {
			data = L.geoJson(data, {
					//inital css style of grid
					// geometry: function(feature){
					// 	type: Point
					// },

					style: function (feature) {
							return {
									fillColor: "#8D9DB2",
									 color: "#000",
									weight: 3.0,
									opacity: 0.3,
									fillOpacity: 0.3
							};
					},
					pointToLayer: function(feature, latlng){
						if(feature.properties.TCDVLP == "Hurricane" && feature.properties.SSNUM == 2){
						 return L.marker(latlng, {icon: markIcon_hurricane2});
						 }
						 else if(feature.properties.TCDVLP == "Hurricane" && feature.properties.SSNUM == 1){
							  return L.marker(latlng, {icon: markIcon_hurricane1});
						 }
						 else if(feature.properties.TCDVLP == "Tropical Storm" && feature.properties.SSNUM == 0){
							 return L.marker(latlng, {icon: markIcon_tropicalstorm});
						}
						else if(feature.properties.TCDVLP == "Tropical Depression" && feature.properties.SSNUM == 0){
							return L.marker(latlng, {icon: markIcon_tropicaldep});
					   }
					   else if(feature.properties.TCDVLP == "Subtropical Depression" && feature.properties.SSNUM == 0){
						   return L.marker(latlng, {icon: markIcon_subtopdep});
					  }
					}
					// onEachFeature: onEachFeature
			}).addTo(map);
	});
