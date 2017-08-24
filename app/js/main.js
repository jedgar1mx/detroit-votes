'use strict';
import Router from './router.class.js';
import Template from './template.class.js';
import View from './view.class.js';
(function(){
  var router = new Router();
  router.updateURLParams({'zoom':13,'lng':-83.15,'lat': 42.36});
  var currentRouting = router.loadURLRouting();
  console.log(router);
  console.log(currentRouting);
  var template = new Template();
  console.log(template.generateTemplate({
    title: "TITLE",
    mainTitle : "Main title",
    mainData  : 225,
    subTitle : "Sub title",
    subData  : null
  }));
  var view = new View({
    map: {
      styleURL: 'mapbox://styles/slusarskiddetroitmi',
      mapContainer: 'map',
      baseLayers: {
        street: 'ciymfavyb00072sqe0bu9rwht',
        satellite: 'cj2m1f9k400132rmr1jhjq2gn'
      },
      center: [-83.15, 42.36],
      zoom: 11.5,
      boundaries: {
        southwest: [-83.3437,42.2102],
        northeast: [-82.8754,42.5197]
      },
      sources: [
        {
          id: "parcels",
          type: "vector",
          url: "mapbox://slusarskiddetroitmi.cwobdjn0"
        },
        {
          id: "councils",
          type: "geojson",
          data: "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
        },
        {
          id: "councils_labels",
          type: "geojson",
          data: "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
        },
        {
          id: "neighborhoods",
          type: "geojson",
          data: "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/1/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
        },
        {
          id: "neighborhoods-labels",
          type: "geojson",
          data: "https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/Neighborhoods/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=2898&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=geojson"
        }
      ],
      layers: [
        {
          "id": "councils-labels",
          "type": "symbol",
          "source": "councils_labels",
          "maxzoom": 12,
          "layout": {
            "text-font": ["Mark SC Offc Pro Bold"],
            "text-field": "{name}",
            "symbol-placement": "point",
            "text-size": 22
          },
          "paint": {
            "text-color": "black"
          }
        },
        {
          "id": "council-borders",
          "type": "line",
          "source": "councils",
          "maxzoom": 12,
          "layout": {},
          "paint": {
            "line-color": "#004b90",
            "line-width": 3
          }
        },
        {
          "id": "council-fill",
          "type": "fill",
          "source": "councils",
          "maxzoom": 12,
          "layout": {},
          "paint": {
            "fill-color": "#0065c3",
            "fill-opacity": 0
          }
        },
        {
          "id": "council-fill-hover",
          "type": "fill",
          "source": "councils",
          "maxzoom": 12,
          "layout": {},
          "paint": {
            "fill-color": "#0065c3",
            "fill-opacity": .5
          },
          "filter": ["==", "name", ""]
        },
        {
          "id": "neighborhoods-fill",
          "type": "fill",
          "source": "neighborhoods",
          "minzoom": 12,
          "maxzoom": 15.5,
          "paint":{
            "fill-color": '#fff',
            'fill-opacity': 0
          }
        },
        {
          "id": "neighborhoods-fill-hover",
          "type": "fill",
          "source": "councils",
          "minzoom": 12,
          "maxzoom": 15.5,
          "layout": {},
          "paint": {
            "fill-color": "#0065c3",
            "fill-opacity": .5
          },
          "filter": ["==", "name", ""]
        },
        {
          "id": "neighborhoods-borders",
          "type": "line",
          "source": "neighborhoods",
          "minzoom": 12,
          "maxzoom": 15.5,
          "layout": {},
          "paint": {
            "line-color": "#004b90",
            "line-width": 3
          }
        },
        {
          "id": "neighborhoods-labels",
          "type": "symbol",
          "source": "neighborhoods-labels",
          "minzoom": 12,
          "maxzoom": 15.5,
          "layout": {
            "text-font": ["Mark SC Offc Pro Bold"],
            "text-field": "{name}"
          },
          "paint": {
            "text-color": "black"
          }
        },
         {
           "id": "parcel-fill",
           "type": "fill",
           "source": "parcels",
           "minzoom": 15.5,
           "paint": {
                "fill-color":"#fff",
                "fill-opacity":0
           },
           'source-layer': 'parcelsgeojson'
         },
         {
          "id": "parcel-line",
          "type": "line",
          "source": "parcels",
          "minzoom": 15.5,
          "paint": {
               "line-color":"#cbcbcb",
          },
          "source-layer": "parcelsgeojson"
         },
         {
           "id": "parcel-selected-fill",
           "type": "line",
           "source": "parcels",
           "minzoom": 15.5,
           "source-layer": "parcelsgeojson",
           "paint": {
             "line-color": "#BD0019",
             "line-width": 3
           },
           "filter": ["==", "parcelno", ""]
         }
      ]
    }
  });
  console.log(view);
  setTimeout(function(){ view.map.changeBaseMap("satellite"); }, 3000);
  setTimeout(function(){ view.map.changeBaseMap("street"); }, 4000);
})(window);
