'use strict';
import mapboxgl from 'mapbox-gl';
import Connector from './connector.class.js';
var MapboxGeocoder = require('mapbox-gl-geocoder');
mapboxgl.accessToken = 'pk.eyJ1IjoiamVkZ2FyMW14IiwiYSI6ImNqNzc0cDc0YjF0eTYzM3A4M2JxaHNocnUifQ.vuXBYSPtZuSfnx3xu9xb0Q';
export default class Map {
  constructor(init) {
    this.data = null;
    this.prevState = null;
    this.currentState = {
      baseMap: init.baseLayers.street,
      center: init.center,
      zoom: init.zoom,
      layers: init.layers,
      sources: init.sources,
      interactive: init.interactive
    };
    this.mapContainer = init.mapContainer;
    this.boundaries = {
      southwest: init.boundaries.sw,
      northeast: init.boundaries.ne,
    };
    Map.setMap(new mapboxgl.Map({
      container: init.mapContainer, // container id
      style: `${init.styleURL}/${init.baseLayers.street}`, //stylesheet location
      center: init.center, // starting position
      zoom: init.zoom, // starting zoom
      keyboard: true,
      maxBounds: [this.boundaries.southwest, this.boundaries.northeast],
      interactive: init.interactive
    }));
    this.styleURL = init.styleURL;
    this.baseLayers = {
      street: init.baseLayers.street,
      satellite: init.baseLayers.satellite
    };
    Map.getMap().on('load',()=>{
      document.getElementById('geocoder').appendChild(this.geocoder.onAdd(Map.getMap()))
    });
    Map.getMap().on('style.load',()=>{
      this.loadMap();
    });
    Map.getMap().on("mousemove", function(e, parent = this) {
      // var features = parent.queryRenderedFeatures(e.point, {
      //   layers: ["council-fill"]
      // });
      // parent.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
    });
    Map.getMap().on('click', function (e) {
      console.log(e);
    });
    this.geocoderActive = false;
    if(init.geocoder){
      this.geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        bbox: [-83.3437,42.2102,-82.8754,42.5197],
        placeholder: "Enter your address."
      });
      this.geocoder.on('result', function(e) {
        if(Map.getGeocoderStatus()){
          console.log("Geocoder already searching");
        }else{
          Map.setGeocoderStatus(true);
          Map.loadGeocoderResults(e);
        }
      });
    }
  }
  changeBaseMap(baseMap){
    Map.getMap().setStyle(`${this.styleURL}/${this.baseLayers[baseMap]}`);
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
        Map.getMap().addSource(this.currentState.sources[i].id, tempSource);
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
      Map.getMap().addLayer(tempLayer);
    }
  }
  static setData(data){
    this.data = data;
  }
  static getData(){
    return this.data;
  }
  static getMap(){
    return this.map;
  }
  static setMap(map){
    this.map = map;
  }
  static setGeocoderStatus(s){
    this.geocoderActive = s;
  }
  static getGeocoderStatus(){
    return this.geocoderActive;
  }
  static loadGeocoderResults(ev){
    console.log(ev);
    Map.getMap().getSource('single-point').setData(ev.result.geometry);
    Connector.getData('https://gis.detroitmi.gov/arcgis/rest/services/DoIT/2016_Voting_Precincts/MapServer/0/query?where=&text=&objectIds=&time=&geometry='+ev.result.geometry.coordinates[0]+'%2C'+ev.result.geometry.coordinates[1]+'&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=json',function( pollPlace ) {
      console.log(JSON.parse(pollPlace));
      document.getElementById('poll-name').innerHTML = JSON.parse(pollPlace).features[0].attributes.polling_lo;
      document.getElementById('poll-addr').innerHTML = JSON.parse(pollPlace).features[0].attributes.polling_ad;

      Connector.getData('https://gis.detroitmi.gov/arcgis/rest/services/NeighborhoodsApp/council_district/MapServer/1/query?where=&text=&objectIds=&time=&geometry='+ev.result.geometry.coordinates[0]+'%2C+'+ev.result.geometry.coordinates[1]+'&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&resultOffset=&resultRecordCount=&f=pjson' , function( district ) {
         console.log(JSON.parse(district));
         let mayorHTML = '<article class="accordion-btn animated-button victoria-two">Candidates for City Mayor</article><article class="accordion-content">';
         let clerkHTML = '';
         let atLargeHTML = '';
         let councilHTML = '';
         let policeHTML = '';
         let data = Map.getData();
         console.log(data);
         data.candidates.forEach(function(candidate){
           switch (candidate.race) {
             case 'Mayor':
               mayorHTML += '<div><h3>'+ candidate.name +'</h3><article class="video-container"><iframe width="100%" height="315" src="'+ candidate.videoURL +'" frameborder="0" allowfullscreen></iframe></article>';

               data.questions.mayor.forEach(function(question, index) {
                 mayorHTML += '<article class="topic-btn animated-button victoria-two" data-id="'+ index +'">'+ question.topic +'</article><article class="topic-accordion" data-id="'+ index +'"><article class="question"><h4>'+ question.q +'</h4><p>'+ candidate.answers[index] +'</p></article></article>';
               });
               break;
             default:

           }
           mayorHTML += '</div>';
           document.getElementById('mayor').innerHTML = mayorHTML;
         });
       });
       document.querySelector('.search-results').className = 'search-results active';
    });
  }
}
