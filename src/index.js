import { Loader } from "@googlemaps/js-api-loader"

const loader = new Loader({
  apiKey: "AIzaSyBQhS6W62IbuMFMsNOCAwYWQcXIYWC7N0c",
  version: "weekly",
});
let map;
let markers = [];
const haightAshbury = { lat: 4.74, lng: -74.03 };
loader.load().then(() => {
  map = new google.maps.Map(document.getElementById("map"), {
    center: haightAshbury,
    zoom: 12,
  });

  map.addListener("click", async (event) => {
    clearMarkers()
    addMarker(event.latLng);
    let dataWhether = await _getWOEID(event.latLng.lat(), event.latLng.lng())
    console.log(dataWhether.woeid)
    dataWhether = await _getWeather(dataWhether.woeid)
    console.log(dataWhether.consolidated_weather[0].max_temp)
    let maxTemp = dataWhether.consolidated_weather[0].max_temp
    drawWhether(maxTemp)
    // console.log(event.latLng.lat())
    // console.log(event.latLng.lng())
  });

// Adds a marker at the center of the map.
addMarker(haightAshbury);

// Adds a marker to the map and push to the array.
  function addMarker(location) {
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
    markers.push(marker);
  }

});

const drawWhether= (data) => {
  document.getElementById('temp').value = data
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
document.getElementById('clearMarkers').addEventListener('click', () => {
  clearMarkers()
})

const clearMarkers = () => setMapOnAll(null);

// Shows any markers currently in the array.
document.getElementById('showMarkers').addEventListener('click', () => {
  setMapOnAll(map);
})



// Deletes all markers in the array by removing references to them.
document.getElementById('deleteMarkers').addEventListener('click', () => {
  clearMarkers();
  markers = [];
})

const _getWOEID = async (lat, lng) => {
  const apiURL = `https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data[0])
    return data[0]
  } catch (err) {
    console.log('Fetch Error', err)
  }
}

const _getWeather = async (woeid) => {
  const apiURL = `https://www.metaweather.com/api/location/${woeid}/`
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    console.log(data)
    return data
  } catch (err) {
    console.log('Fetch Error', err)
  }
}

