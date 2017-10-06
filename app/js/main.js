'use strict';
import Map from './map.class.js';
// import Candidate from './candidate.class.js';
import Connector from './connector.class.js'
(function(){
  let map = new Map({
    styleURL: 'mapbox://styles/mapbox',
    mapContainer: 'map',
    geocoder: true,
    baseLayers: {
      street: 'streets-v10',
      satellite: 'cj774gftq3bwr2so2y6nqzvz4'
    },
    interactive: true,
    center: [-83.15, 42.36],
    zoom: 11.5,
    boundaries: {
      sw: [-83.3437,42.2102],
      ne: [-82.8754,42.5197]
    },
    sources: [
      {
        id: 'single-point',
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      },
      {
        id: "councils",
        type: "geojson",
        data: "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
      },
      {
        id: "polls",
        type: "geojson",
        data: "https://gis.detroitmi.gov/arcgis/rest/services/DoIT/2016_Voting_Precincts/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
      }
    ],
    layers: [
      {
        "id": "council-fill",
        "type": "fill",
        "source": "councils",
        "layout": {},
        "paint": {
          "fill-color": "#0065c3",
          "fill-opacity": 0
        }
      },
      {
        "id": "poll-fill",
        "type": "fill",
        "source": "councils",
        "layout": {},
        "paint": {
          "fill-color": "#00c39a",
          "fill-opacity": 0
        }
      },
      {
          "id": "point",
          "source": "single-point",
          "type": "circle",
          "paint": {
              "circle-radius": 10,
              "circle-color": "#007cbf"
          }
      }
    ]
  });

  Connector.getData('js/data.json', function(response){
    console.log(JSON.parse(response));
    Map.setData(JSON.parse(response));
  });

  console.log(map);
  let pollBtn = document.querySelector('.accordion-btn-1');
  console.log(pollBtn);
  pollBtn.addEventListener('click', function(e){
    Map.toggleDisplay(e);
  });
})(window);
