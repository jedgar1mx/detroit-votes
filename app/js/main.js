'use strict';
import Map from './map.class.js';
// import Candidate from './candidate.class.js';
import Connector from './connector.class.js'
(function(){
  /*
Mike Duggan
Coleman A. Young
Garlin D. Gilchrist II
Janice M. Winfrey
Janee L. Ayers
Brenda Jones
Beverly Kindle-Walker
Mary Waters
Tamara Smith
James E. Tate
Roy McCalister Jr.
Virgil Smith
Russ Bellant
Scott Benson
Latisha Johnson
Andre L. Spivey
Mary Sheffield
Jewel Ware
Tyrone Carter
Raquel Castaneda-Lopez
Gabe Leland
Regina Ross
Darryl D. Brown
Conrad L. Mallet
Carron L. Pinkins
Shirley Burch
Willie E. Bellant
Scotty Boman
George Adams Jr.
Willie E. Burton
Lisa Carter
William M. Davis
   */
  var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    let findNaN = needle !== needle;
    let indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            let i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                let item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
  };
  Connector.getData('js/data.json', function(response){
    console.log(JSON.parse(response));
  });
  var map = new Map({
    styleURL: 'mapbox://styles/jedgar1mx',
    mapContainer: 'map',
    geocoder: true,
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
        data: "http://gis.detroitmi.gov/arcgis/rest/services/DoIT/2016_Voting_Precincts/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
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
  console.log(map);
})(window);
