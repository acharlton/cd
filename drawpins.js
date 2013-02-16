// draw a set of pins as returned from database call. 
// can be shelters offices or base radios
// each set has differing parameters for display

var citiLayer = new L.LayerGroup();
var markers = new L.MarkerClusterGroup({
	//meters
	maxClusterRadius: 8
});

// clean up then draw
function drawpins(type,district){
        removeMarkers();
        draw(type,district);
}

function draw(type,district){
        $.ajax({
                url: '/cgi-bin/cd_drawpins.pl?type='+ type + '&district=' + district,
                dataType: 'json',
		contentType: 'application/json; charset=utf-8',
                success: function(series) {
                        //citiLayer.clearLayers();
                        markers.clearLayers();
			var ll = new Array;
			if(type=='shelters'){
				ll = addLocation(type,district,series);
			}else if(type=='offices'){
				ll = addLocation(type,district,series);
			}else if(type=='base_radios'){
				ll = addBaseRadios(type,district,series);
			}
                        map.addLayer(markers);
                        //map.addLayer(citiLayer);
			map.setView(new L.LatLng(ll[0],ll[1]), 10);
                }
        });
}

function addLocation(type,district,series){
	for(i=0; i<series[0].lat.length; i++){
        	var name = series[0].name[i];
		var address = series[0].address[i];
		var owner = series[0].owner[i];
		var contact1 = series[0].contact1[i];
                var lat = series[0].lat[i];
                var lng = series[0].lng[i];
                var html = '<table id="tbl_popup"><caption><strong>Information for ' + type + ' in ' + district + '</strong></caption><tr><td>Office Name:</td><td>' + name.toUpperCase() + '</td></tr><tr><td>Address</td><td>'+address+'</td></tr><tr><td>Owner</td><td><a href="">' + owner + '</a></td><tr><td>Contact1</td><td>' + contact1 + '</td></tr>';
                var markerLocation = new L.LatLng(lat,lng,true);
		var marker = new L.Marker(markerLocation);
                marker.bindPopup(html,{maxWidth:400});
		markers.addLayer(marker);
                //citiLayer.addLayer(marker);
         };
	return [lat,lng];
}

function addBaseRadios(type,district,series){
	for(i=0; i<series[0].lat.length; i++){
        	var serial_number = series[0].serial_number[i];
		var model = series[0].model[i];
		var ani = series[0].ani[i];
		var last_check = series[0].last_check[i];
		var address = series[0].address[i];
		var owner = series[0].owner[i];
		var contact1 = series[0].contact1[i];
                var lat = series[0].lat[i];
                var lng = series[0].lng[i];
                var name = series[0].name[i];
                var building_type = series[0].building_type[i];
                var html = '<table id="tbl_popup"><caption><strong>Information for ' + type + ' in ' + district + '</strong></caption><tr><td>Name:</td><td>' + name.toUpperCase() + '</td></tr><tr><td>Address</td><td>'+address+'</td></tr><tr><td>Owner</td><td><a href="">' + owner + '</a></td><tr><td>Contact1</td><td>' + contact1 + '</td></tr><tr><td>Model:</td><td>' + model + '</td></tr><tr><td>Serial Number:</td><td>'+serial_number+'</td></tr><tr><td>ANI:</td><td>'+ani+'</td></tr><tr><td>Last Check:</td><td>'+last_check+'</td></tr>' ;
                var markerLocation = new L.LatLng(lat,lng,true);
                var marker = new L.Marker(markerLocation);
                marker.bindPopup(html,{maxWidth:400});
		markers.addLayer(marker);
                //citiLayer.addLayer(marker);
         };
	return [lat,lng];
}


