L.Wax = L.Class.extend({

  initialize: function (map) {
    this.map = map;
    var layers = map.options.layers || [];
    var wax = false;
    var self = this;
    
    map.on('layeradd', function(e) {
      if (e.layer.options && e.layer.options.wax) {

	// set each layer individually to appropriate background and zoom levels - only affects when wax is used
	//console.log(e.layer._url);
        //var pattern = /blueglass||orangeglass||OSMBright/g;
        var pattern = /blueglass/;
        if(pattern.test(e.layer._url)){
        	map.options.minZoom=2;
                map.options.maxZoom=16;
		//console.log("set zoom 2-16");
        }
        var pattern = /orangeglass/;
        if(pattern.test(e.layer._url)){
        	document.getElementById('map').style.background = '#e0f3f8';
        	map.options.minZoom=2;
                map.options.maxZoom=16;
	//	console.log("set zoom 2-16");
        }
        var pattern = /OSMBright/;
        if(pattern.test(e.layer._url)){
        	document.getElementById('map').style.background = '#c4dff6';
        	map.options.minZoom=2;
                map.options.maxZoom=16;
		//console.log("set zoom 2-16");
        }
        var pattern = /topo8_16/;
        if(pattern.test(e.layer._url)){
        	document.getElementById('map').style.background = '#b8dee6';
        	map.options.minZoom=8;
                map.options.maxZoom=16;
		//console.log("set zoom 8-16");
		if(map.getZoom()<8){
			map.setZoom(8);
		}
        }
        var pattern = /hillshade/;
        if(pattern.test(e.layer._url)){
        	document.getElementById('map').style.background = '#8ce';
        	map.options.minZoom=10;
                map.options.maxZoom=16;
		//console.log("set zoom 8-16");
		if(map.getZoom()<10){
			map.setZoom(10);
		}
        }
        var pattern = /world-dark/;
        if(pattern.test(e.layer._url)){
        	document.getElementById('map').style.background = '#55557f';
        	map.options.minZoom=2;
                map.options.maxZoom=11;
		//console.log("set zoom 2-11");
		if(map.getZoom()>11){
			map.setZoom(11);
		}
        }
        var pattern = /control-room/;
        if(pattern.test(e.layer._url)){
        	document.getElementById('map').style.background = '#001420';
        	map.options.minZoom=3;
                map.options.maxZoom=11;
		//console.log("set zoom 3-11");
		if(map.getZoom()>11){
			map.setZoom(11);
		}
        }
        var pattern = /naturalearth/;
        if(pattern.test(e.layer._url)){
        	map.options.minZoom=2;
                map.options.maxZoom=9;
		//console.log("set zoom 2-9");
		if(map.getZoom()>9){
			map.setZoom(9);
		}
        }


        self._getTilejson(e.layer, self._addWax);
        wax = true;
      } else {
        wax = false;
      }
    });
	
    map.on('layerremove', function(e) {
      if (e.layer.options && e.layer.options.wax && !wax) {
      	self._removeWax();
      }  
    });

    for (var i = 0; i < layers.length; i++) {
      if (layers[i].options.wax) {
        this._getTilejson(layers[i], this._addWax);
        wax = true;
      }
    }

  },

  _getTilejson: function (layer, callback) {
    var self = this;
    var tilejson = layer.options.wax;
    if (typeof tilejson === 'string') {
      wax.tilejson(tilejson, function(response) {
        layer.options.wax = response; 
        callback.call(self, response) 
      });
    } else {
      callback.call(this, tilejson)
    }
  },

  _addWax: function (tilejson) {
    this._removeWax();

  	if (tilejson.legend) {
  	  this.legend = wax.leaf.legend(this.map, tilejson).appendTo(this.map._container);
  	};  

  	if (tilejson.grids) {
      this.tooltip = wax.tooltip();
      this.interaction = wax.leaf.interaction()
       .map(map)
       .tilejson(tilejson)
       .on(this.tooltip.animate(true).parent(map._container).events());
    } 
  },

  _removeWax: function() {
    if (this.legend) {
      var el = this.legend.element();
      el.parentNode.removeChild(el);
      this.legend = null;
    }
    if (this.interaction) {
      var el = document.getElementsByClassName('wax-tooltip')[0]; // Better to have access to element directly
      if (el) {
        this.tooltip.parent().removeChild(el);
      }
      this.interaction.remove();
      this.interaction = null;
    }  	
  }


});

L.wax = function (map) {
  return new L.Wax(map);
};
