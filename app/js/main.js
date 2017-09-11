'use strict';
import Map from './map.class.js';
(function(){
  var map = new Map({
      styleURL: 'mapbox://styles/jedgar1mx',
      mapContainer: 'map',
      baseLayers: {
        street: 'cj774gftq3bwr2so2y6nqzvz4',
        satellite: 'cj774gftq3bwr2so2y6nqzvz4'
      },
      center: [-83.15, 42.36],
      zoom: 11.5,
      boundaries: {
        sw: [-83.3437,42.2102],
        ne: [-82.8754,42.5197]
      },
      sources: [
      ],
      layers: [
      ]
    });
  console.log(map);
})(window);
