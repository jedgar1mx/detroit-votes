(function(){
  var getRequest = function getRequest(theUrl, callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.response);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
  }
  var sendRequest = function sendRequest(url, data, success) {
    var params = typeof data == 'string' ? data : Object.keys(data).map(
            function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]); }
        ).join('&');
    console.log(params);
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
    xhr.open('POST', url);
    xhr.onload  = function() {
      if (xhr.readyState>3 && xhr.status==200) {
        console.log('xhr success');
        success(xhr.response);
      }else{
        console.log('xhr error');
        document.querySelector('.invalid-phone-error-message').innerHTML = 'There was an error with your request. Please try again.';
        document.querySelector('.phone-invalid-alert').className = 'phone-invalid-alert active';
      }
    };
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.addEventListener("error", function(e){
      console.log(e);
    });
    xhr.send(params);
    return xhr;
  };
  mapboxgl.accessToken = 'pk.eyJ1Ijoic2x1c2Fyc2tpZGRldHJvaXRtaSIsImEiOiJjaXZsNXlwcXQwYnY5MnlsYml4NTJ2Mno4In0.8wKUnlMPIlxq-eWH0d10-Q';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-79.4512, 43.6568],
    zoom: 13
  });
  var token = null;
  var parcel = null;
  var loadService = function loadService(response) {
    var availability = JSON.parse(response);
    console.log(availability);
    if(availability.features.length){
      document.getElementById('results').innerHTML = "<h3 style='color:#3666a6' class='text-center'>You are eligible for " + availability.features[0].attributes.ProgramArea + ".</h3>";
    }else{
      document.getElementById('results').innerHTML = "<h3 style='color:#993336' class='text-center'>You are not eligible for this program.</h3>";
    }
  }
  var setParcel = function setParcel(p){
    parcel = p;
  }
  var getParcel = function getParcel() {
    return parcel;
  }
  var saveToken = function saveToken(response) {

    token = response;
    console.log(token);
    console.log(getParcel());
    var data = {
      token : token,
      where: "PARCELNO='"+ getParcel() +"'",
      geometryType: 'esriGeometryPoint',
      spatialRel: 'esriSpatialRelIntersects',
      outFields: 'ProgramArea',
      returnIdsOnly: false,
      returnCountOnly: false,
      returnZ: false,
      returnM: false,
      returnDistinctValues: false,
      f: 'pjson'
    }
    sendRequest("https://cors-anywhere.herokuapp.com/"+"https://gis.detroitmi.gov/arcgis/rest/services/DoIT/bridging_neighborhoods/MapServer/0/query", data, loadService);
  }
  var geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
  });
  geocoder.on('result', function(ev) {
    console.log(ev);
    var tempInput = ev.result.place_name;
    var tempAddr = '';
    if (tempInput.split(',')[0] !== '') {
      // console.log(tempInputList[i].value.split(',')[0]);
      tempAddr = tempInput.split(',')[0];
      tempAddr = tempAddr.split(' ');
    }else {
      // console.log("Empty input");
    }
    var newTempAddr = '';
    var size = tempAddr.length;
    tempAddr.forEach(function(item, index) {
      newTempAddr += item;
      ((index < size) && (index + 1) !== size) ? newTempAddr += '+': 0;
    });
    getRequest('https://gis.detroitmi.gov/arcgis/rest/services/DoIT/CompositeGeocoder/GeocodeServer/findAddressCandidates?Street=&City=&ZIP=&SingleLine='+ newTempAddr +'&category=&outFields=User_fld&maxLocations=&outSR=&searchExtent=&location=&distance=&magicKey=&f=json',function(response){
      var responseObj = JSON.parse(response);
      console.log(responseObj.candidates[0].attributes.User_fld);
      setParcel(responseObj.candidates[0].attributes.User_fld);
    });
    var data = {
      'username': 'montese_detroitmi',
      'password':  'D3troit!',
      'client': 'referrer',
      'referer': "http://bridging.theneighborhoods.org/",
      'expiration': 100
    }
    sendRequest("https://cors-anywhere.herokuapp.com/"+"https://gis.detroitmi.gov/arcgis/tokens/generateToken", data, saveToken);
  });
  document.getElementById('geocoder').appendChild(geocoder.onAdd(map));
})(window);
