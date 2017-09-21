'use strict';
import Map from './map.class.js';
import Candidate from './candidate.class.js';
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
