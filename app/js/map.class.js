'use strict';
import mapboxgl from 'mapbox-gl';
import Connector from './connector.class.js';
var MapboxGeocoder = require('mapbox-gl-geocoder');
mapboxgl.accessToken = 'pk.eyJ1IjoiamVkZ2FyMW14IiwiYSI6ImNqNzc0cDc0YjF0eTYzM3A4M2JxaHNocnUifQ.vuXBYSPtZuSfnx3xu9xb0Q';
export default class Map {
  constructor(init) {
    this.geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken
    });
    this.prevState = null;
    this.currentState = {
      baseMap: init.baseLayers.street,
      center: init.center,
      zoom: init.zoom,
      layers: init.layers,
      sources: init.sources
    };
    this.mapContainer = init.mapContainer;
    this.map = new mapboxgl.Map({
      container: init.mapContainer, // container id
      style: `${init.styleURL}/${init.baseLayers.street}`, //stylesheet location
      center: init.center, // starting position
      zoom: init.zoom, // starting zoom
      keyboard: true
    });
    this.styleURL = init.styleURL;
    this.baseLayers = {
      street: init.baseLayers.street,
      satellite: init.baseLayers.satellite
    };
    this.boundaries = {
      southwest: init.boundaries.sw,
      northeast: init.boundaries.ne,
    };
    this.map.on('load',()=>{
      document.getElementById('geocoder').appendChild(this.geocoder.onAdd(this.map))
    });
    this.map.on('style.load',()=>{
      this.loadMap();
    });
    this.map.on("mousemove", function(e, parent = this) {
      var features = parent.queryRenderedFeatures(e.point, {
        layers: ["council-fill"]
      });
      if (features.length) {
        parent.setFilter("council-fill-hover", ["==", "districts", features[0].properties.districts]);
      }else{
        parent.setFilter("council-fill-hover", ["==", "districts", ""]);
        features = parent.queryRenderedFeatures(e.point, {
          layers: ["neighborhoods-fill"]
        });
        if (features.length) {
          parent.setFilter("neighborhoods-fill-hover", ["==", "name", features[0].properties.name]);
        }else{
          parent.setFilter("neighborhoods-fill-hover", ["==", "name", ""]);
        }
      }
      parent.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });
    this.map.on('click', function (e) {
      console.log(e);
    });
    this.geocoder.on('result', function(ev) {
      console.log(ev);
      Connector.getData('http://gis.detroitmi.gov/arcgis/rest/services/DoIT/2016_Voting_Precincts/MapServer/0/query?where=&text=&objectIds=&time=&geometry='+ev.result.geometry.coordinates[0]+'%2C'+ev.result.geometry.coordinates[1]+'&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json',function( pollPlace ) {
        console.log(JSON.parse(pollPlace));
      });
      Connector.getData('http://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=&text=&objectIds=&time=&geometry='+ev.result.geometry.coordinates[0]+'%2C+'+ev.result.geometry.coordinates[1]+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson' , function( district ) {
         console.log(JSON.parse(district));
      });
    });
  }
  changeBaseMap(baseMap){
    this.map.setStyle(`${this.styleURL}/${this.baseLayers[baseMap]}`);
  }
  loadMap() {
    let sourcePromise = new Promise((resolve, reject) => {
      (this.loadSources()) ? resolve(this) : reject(this);
    });
    sourcePromise.then(function(val){
      val.loadLayers(val);
    }).catch(function(e){
      console.log("Error:" + e);
    });
  }
  loadSources() {
    try {
      for (var i = 0; i < this.currentState.sources.length; i++) {
        let tempSource = {
          type: this.currentState.sources[i].type
        };
        (this.currentState.sources[i].data === undefined) ? 0: tempSource.data = this.currentState.sources[i].data;
        (this.currentState.sources[i].url === undefined) ? 0: tempSource.url = this.currentState.sources[i].url;
        this.map.addSource(this.currentState.sources[i].id, tempSource);
      }
      return true;
    } catch (e) {
      console.log("Error:" + e);
      return false;
    }
  }
  loadLayers(val) {
    for (var i = 0; i < val.currentState.layers.length; i++) {
      let tempLayer = {
        id: val.currentState.layers[i].id,
        source: val.currentState.layers[i].source,
      };
      (val.currentState.layers[i].paint === undefined) ? 0: tempLayer.paint = val.currentState.layers[i].paint;
      (val.currentState.layers[i].layout === undefined) ? 0: tempLayer.layout = val.currentState.layers[i].layout;
      (val.currentState.layers[i].type === undefined) ? 0: tempLayer.type = val.currentState.layers[i].type;
      (val.currentState.layers[i]['source-layer'] === undefined) ? 0: tempLayer['source-layer'] = val.currentState.layers[i]['source-layer'];
      (val.currentState.layers[i].filter === undefined) ? 0: tempLayer.filter = val.currentState.layers[i].filter;
      (val.currentState.layers[i].minzoom === undefined) ? 0: tempLayer.minzoom = val.currentState.layers[i].minzoom;
      (val.currentState.layers[i].maxzoom === undefined) ? 0: tempLayer.maxzoom = val.currentState.layers[i].maxzoom;
      (val.currentState.layers[i].metadata === undefined) ? 0: tempLayer.metadata = val.currentState.layers[i].metadata;
      (val.currentState.layers[i].ref === undefined) ? 0: tempLayer.ref = val.currentState.layers[i].ref;
      val.map.addLayer(tempLayer);
    }
  }
}
