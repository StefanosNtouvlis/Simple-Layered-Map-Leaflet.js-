let places = L.layerGroup();

let house = L.marker([39.55451, 21.76161]).bindPopup("This is my house.").addTo(places);

let school = L.marker([39.5565, 21.7593]).bindPopup("This is my school.").addTo(places);

let cafe = L.marker([39.554, 21.7672]).bindPopup("This is my cafe.").addTo(places);

let line = L.polyline(
   [
     [39.55451, 21.76161],
     [39.5565, 21.7593],
     [39.554, 21.7672],
   ],
   { color: "red", weight: 6 }
 ).addTo(places);

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

var mbUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';
var streets = L.tileLayer(mbUrl, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, attribution: mbAttr});
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});


let map = L.map("map", {
  center: [39.55451, 21.76161],
  zoom: 16,
  layers: [osm, streets, places],
});


let baseMaps = {
  "OpenStreetMap": osm,
  "Mapbox Streets": streets,
};

let overlayMaps = {
  "Places": places,
};

let layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

 function precise(x) {
   return x.toPrecision(6);
 }
 let popup = L.popup();
 function onMapClick(e) {
   popup
     .setLatLng(e.latlng)
     .setContent(
       "You clicked the map at -<br>" +
         "<b>lon:</b> " +
         precise(e.latlng.lng) +
         "<br>" +
        "<b>lat:</b> " +
        precise(e.latlng.lat)
     )
     .openOn(map);
 }
 map.addEventListener("click", onMapClick);

 let legend = L.control({ position: "bottomleft" });
 legend.onAdd = function () {
   let div = L.DomUtil.create("div", "legend");
   div.innerHTML =
     "<p><b>Map 1.0</b></p><hr>" +
     "<p>First Edition of practice map.<br>" +
     "Notable Places:<br>" +
     "<p><ul>" +
     "<li>Home</li>" +
     "<li>School</li>" +
     "<li>Cafe</li>" +
     "</ul></p>";
   return div;
 };
 legend.addTo(map);