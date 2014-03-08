function parse_coordinates(url, callback) {
	//debugger;
	$.getJSON(url, function (data) {
			var features = data["features"]
			var coordinates = []
			//debugger

			for (var x in features) {
				var latlong = features[x]["geometry"]["coordinates"];
				//debugger;
				coordinates.push([latlong[0], latlong[1]])
			};
			callback(coordinates)
		}
	);
}

function do_after_delay(time, delay, array, funk) {
	for(var element in array) {
		setTimeout(function(element, time){ funk(element, time) }, time, element, time)

		time += delay
	}
}

function plot_points(coordinates) {
	// include GeoJSON inside this JavaScript
	//debugger;
	/*var haiti = {"type":"FeatureCollection","features":[
	{"type":"Feature","properties":{"name":"Haiti"},"geometry":{"type":"Polygon","coordinates":[coordinates]},"id":"HTI"}
	]};

	L.geoJson( haiti, {
	    style: function (feature) {
	        return { opacity: 0, fillOpacity: 0.5, fillColor: "#0f0" };
	    },
	    onEachFeature: function(feature, layer){
	        layer.bindPopup("Hello GeoJSON!");
	    }
	}).addTo(map);*/


	do_after_delay(0, 500, coordinates, function(element, time){
		var lng = coordinates[element][0];
		var lat = coordinates[element][1];
		var latlng = new L.LatLng( lat, lng)
		var timeoutdelay = time + 2000
		
		p = new R.Pulse(latlng, 5, {'stroke': '#2478ad', 'fill': '#30a3ec'}, {'stroke': '#30a3ec', 'stroke-width': 2},2000);
		map.addLayer(p);
		
		setTimeout(function(p) {
			//debugger;
			map.removeLayer(p);
		}, timeoutdelay, p);
	})



	//map.addLayers(markers);

	/*var heat = L.heatLayer(coordinates,{
            radius: 30,
            blur: 17,
            maxZoom: 17,
        }).addTo(map);*/
}

function initialize_map() {
	// create a map
	map = new L.Map('mymap');

	// create the OpenStreetMap layer
	var osmTile = "http://tile.openstreetmap.org/{z}/{x}/{y}.png";
	var osmCopyright = "Map data &copy; 2012 OpenStreetMap contributors";
	var osmLayer = new L.TileLayer(osmTile, { maxZoom: 2, attribution: osmCopyright } );

	map.addLayer(osmLayer);

	// set the map's starting view
	map.setView( new L.LatLng(20, -73), 7 );
	return map
}

function main() {
	//debugger;
	var map = initialize_map()

	var urllist = ["js/data2.json"]

	var time = 1000, next = 2000;

	for (var url in urllist) {
		var time2 =1000
		setTimeout(function(){
			parse_coordinates(urllist[0], function(coordinates){
				plot_points(coordinates)
				time2+=1000
				console.log("insideparse");
			})
		}, time2)

		time += 10000;
	}
}

$(function(){
	console.log("in main.js")
	main()
})
