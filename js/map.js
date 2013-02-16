// Create base maps
var base = {
  'Cyprus Blue Glass': L.tileLayer('/tiles/blueglass/{z}/{x}/{y}.png',{wax: '/tiles/blueglass.tilejson'}),
  'Cyprus Orange Glass': L.tileLayer('/tiles/orangeglass/{z}/{x}/{y}.png', {wax: '/tiles/orangeglass.tilejson'}),
  'Cyprus Topographic': L.tileLayer('/tiles/topo8_16/{z}/{x}/{y}.png',{wax: '/tiles/topo8_16.tilejson'}),
  'Hillshade': L.tileLayer('/tiles/hillshade/{z}/{x}/{y}.png', {
    attribution: '<a href="http://10.180.12.121/">CYPRUS</a>',
    wax: '/tiles/hillshade.tilejson'
  }),
  //'Cyprus Blue': L.tileLayer('/tiles/blue/{z}/{x}/{y}.png',{wax: '/tiles/blue.tilejson'}),
  //'Cyprus-Blue': L.tileLayer('/tiles/bluecyprus/{z}/{x}/{y}.png',{wax: '/tiles/blue.tilejson'}),
  //'CD': L.tileLayer('/tiles/cd/{z}/{x}/{y}.png'),
  'Control-Room': L.tileLayer('/tiles/control-room/{z}/{x}/{y}.png',{wax:'/tiles/control-room.tilejson'}),
  //'Cyprus16': L.tileLayer('/tiles/cyprus16/{z}/{x}/{y}.png'),
  'OSMBright': L.tileLayer('/tiles/OSMBright/{z}/{x}/{y}.png',{wax: '/tiles/OSMBright.tilejson'}),
  'WorldDark': L.tileLayer('/tiles/world-dark/{z}/{x}/{y}.png',{wax: '/tiles/world-dark.tilejson'}),
  'World Terrain (Mapbox)': L.tileLayer('http://a.tiles.mapbox.com/v3/coderabbit.map-w6wrcu7v/{z}/{x}/{y}.png',{wax: '/tiles/hillshade.tilejson'}),
  'World Terrain En (Mapbox)': L.tileLayer('http://a.tiles.mapbox.com/v3/coderabbit.map-1i2xmww6/{z}/{x}/{y}.png',{wax: '/tiles/hillshade.tilejson'}),
  'World Dark-Blue (Mapbox)': L.tileLayer('http://a.tiles.mapbox.com/v3/coderabbit.map-738gld50/{z}/{x}/{y}.png',{wax: '/tiles/hillshade.tilejson'}),
  //'Blue Marble (0-11)': L.tileLayer('http://a.tiles.mapbox.com/v3/mapbox.blue-marble-topo-jul/{z}/{x}/{y}.png',{attribution: 'test',wax:'/tiles/cyprus.tilejson'}),
  'OSM': L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '<a href="http://osm.org/">Open Street Maps</a>',
    wax: '/tiles/hillshade.tilejson'
  })
};

var circleOptions = {
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.6
};

var overlays = {
  'Roads (layer)': L.tileLayer('/tiles/roads/{z}/{x}/{y}.png'),
  'UN OPs (layer)': L.tileLayer('/tiles/ops/{z}/{x}/{y}.png',{
    wax: '/tiles/ops.tilejson'
  }),

  // using geojson files as specified during the loading of the main page script tags
  // un ops are points, which are converted to layers/polygons for better interaction
  'UN OPs (dia 100m)': L.geoJson(ops, {
    pointToLayer: function(feature,latlng){
        return L.circle(latlng,100,circleOptions);
    },
    onEachFeature: function(feature, layer) {
      // op layer events
      layer.bindPopup('<strong>' + feature.properties.Location + '</strong>');
      layer.on({
        mouseover: function(e) {
          e.target.setStyle({
            weight: 3
          });
          e.target.setRadius(400);
        },
        mouseout: function(e) {
          e.target.setStyle({
            weight: 1
          });
          e.target.setRadius(100);
        }
      });
    }
  }),

  // 5 geographic regions of cyprus as polygons
  'Regions (geoJson)': L.geoJson(regions, {
    style: {
      color: '#550055',
      weight: 1,
      opacity: 1,
      fillOpacity: 0
    },
    onEachFeature: function(feature, layer) {
      layer.bindPopup('<strong>' + feature.properties.NAME_1 + '</strong>');
      layer.on({
        mouseover: function(e) {
          e.target.setStyle({
            weight: 3,
            fillOpacity: 0.1
          });
        },
        mouseout: function(e) {
          e.target.setStyle({
            weight: 1,
            fillOpacity: 0
          });
        }
      });
    }
  })
};

// on clicking home button - go and get json data from missions table, create and populate the 'zones' menu item on the main nav bar if table contains zones - if not only show databases menu item
$.ajax({
	url: '/cgi-bin/cd_districts_json.pl',
        dataType: 'json',
        success: function(series) {
		$('<li id="nav_mission"><a id="li_nav_mission" href="#">Districts</a><ul id="z"></ul></li>').appendTo('#nav');
		$.each(series[0].district,function(i,value){
			// append list of districts to 'Districts' menui , var 'value' is the district
			$('<li><a id="'+value+'" href="#">'+value+'</a></li>').appendTo('#z');
			$('#'+value).click(function(){
				getEq(value);
			});	
		});
        }
});

function getEq(district){
			$('#li_eq_distribution').remove();
			$('#li_performance_dashboards').remove();
			$('#nav_databases').remove();
			$('#li_nav_mission').text('District: ' + district);

			// Top menu
                	$('<li id="nav_databases"><a href="#">Facilities</a><ul id="d"></ul></li>').appendTo('#nav');
                	// list of facilties
			$('<li id="nav_databases_locations" class="facility"><a href="#" id="shelters">Shelters</a></li>').appendTo('#d');
			$('<li id="nav_databases_offices" class="facility"><a href="#" id="offices">Offices</a></li>').appendTo('#d');
			$('<li id="nav_databases_base_radios" class="facility"><a href="#" id="base_radios">Base Radios</a></li>').appendTo('#d');
			// when user clicks one of the facilities (shelters|offices|radios) draw the pins that are associated with the facility
			$('.facility a').click(function (f) {
				var type = this.id;
				drawpins(type,district); // drawpins.js type=shelters|offices|radio mission=Farmagusta|Nicosia... 
			});

			// Admin...
                	$('<li id="nav_databases_admin"><a href="#" id="menu_admin">Admin...</a><ul><li><a href="#" id="admin_shelters">Shelters</a></li><li><a href="#" id="admin_offices">Offices</a></li><li><a href="#" id="admin_base_radios">Base Radios</li><li><a href="#" id="admin_vehicle_radios">Vehicle Radios</a></li><li><a href="#" id="admin_portable_radios">Portable Radios</a></li></ul></li>').appendTo('#d');
			$('#admin_shelters').click(function(){admin_shelters(district);}); // databases.js
			$('#admin_offices').click(function(){admin_offices(district);}); // databases.js
			$('#admin_base_radios').click(function(){admin_base_radios(district);}); // databases.js
			$('#admin_vehicle_radios').click(function(){admin_vehicle_radios(district);}); // databases.js
			$('#admin_portable_radios').click(function(){admin_portable_radios(district);}); // databases.js

			// Maintenance...

			// Maps...
			// using leaflet control now!
                	//$('<li id="nav_databases_maps"><a href="#" id="maps">Other Maps...</a><ul class="layerswitch"><li><a id="mapbox" href="#">Purple</a></li><li><a id="mapbox2" href="#">Night</a></li></ul></li></ul></li>').appendTo('#d');
			//class to change background maps
			$('.layerswitch a').click(function (e) {
			      	e.preventDefault();
      				layer = this.id;
      				$('.layerswitch a').removeClass('active');
      				$(this).addClass('active');
      				refreshMap();
			});

}
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function refreshMap() {
	//layer = 'mapbox';
	urlBase = 'http://10.180.12.121/js/';
        mapurl = urlBase + layer + '.jsonp';
        var center = map.getCenter();
        var zoom = map.getZoom();
        $.ajax({
                url: mapurl,
                dataType: 'json',
                success: function(grid) {
                        cloudmadeUrl = grid.tiles[0];
                        cloudmadeAttribution = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade';
                        map.removeLayer(cloudmade);
                        cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 17, scheme: 'xyz', attribution: cloudmadeAttribution});
                        map.setView(center, zoom).addLayer(cloudmade);
                }
        });
}

// Get url parameters
var params = {};
window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
   params[key] = decodeURIComponent(value);
});

document.getElementById('map').style.background = '#71b8e6';
var baseLayer = (base[params.base]) ? [base[params.base]] : [base.Hillshade];
var layers = baseLayer.concat((params.layers) ? params.layers.split(',').map(function(item) { return overlays[item]; }) : []);

// Create map
var map = new L.Map('map', {
	crs: L.CRS.EPSG900913,
        center: [params.lat || 35.1028, params.lng || 33.3996],
        minZoom: 10,
        maxZoom: 16,
        zoom: params.zoom || 9,
        layers: layers
});

// Add controls
L.control.scale().addTo(map);
var layerControl = L.control.layers(base, overlays, {collapsed: true}).addTo(map);
L.wax(map);

