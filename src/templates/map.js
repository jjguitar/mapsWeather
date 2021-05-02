import '../assets/styles/Header.scss'
import '../assets/styles/MediaQuery.scss'
import '../assets/styles/Map.scss'
import { Loader } from "@googlemaps/js-api-loader"
import { viewTemp } from '../templates/viewTemp.js'
import { getWOEID, getWeather, getWeatherInput} from '../utils/APITemp.js'

const Maps = (temp) => {

  let map
  let infoWindow
  let dataWhether
  let header = document.getElementById('input')
  let markers = [];
  const miamiCity = { lat: 25.728979, lng: -80.237419 }

  const loader = new Loader({
    apiKey: "AIzaSyBQhS6W62IbuMFMsNOCAwYWQcXIYWC7N0c",
    version: "weekly",
  });

  const setMapOnAll = (map) => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  const clearMarkers = () => setMapOnAll(null);

  loader.load().then(async () => {

    const _dataWeatherFnt = async (lat, lng) => {
      dataWhether = await getWOEID(lat, lng)
      dataWhether = await getWeather(dataWhether.woeid)
      await temp.setDataWhether(dataWhether)
      await viewTemp(temp)
    }

    const _drawMap = async (coordinates, zoom) => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: coordinates,
        zoom: zoom,
      });
      await _currentLocation(map)
      map.addListener("click", async (event) => {
        let lat, lng
        clearMarkers()
        _addMarker(event.latLng);
        lat = event.latLng.lat()
        lng = event.latLng.lng()
        _dataWeatherFnt(lat, lng)
      });
    }

    const _currentLocation = async (map) => {
      infoWindow = new google.maps.InfoWindow();
      const locationButton = document.createElement("button");
      locationButton.textContent = "Found you";
      locationButton.classList.add("custom-map-control-button");
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(locationButton);
      locationButton.addEventListener("click", () => {
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              infoWindow.setPosition(pos);
              infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
              _drawMap(pos, 12)
              _addMarker(pos)
              _dataWeatherFnt(pos.lat, pos.lng)
            },
            () => {
              _handleLocationError(true, infoWindow, map.getCenter());
            }
          );
        } else {
          // Browser doesn't support Geolocation
          _handleLocationError(false, infoWindow, map.getCenter());
        }
      });
    }

    const _handleLocationError = (browserHasGeolocation, infoWindow, pos) => {
      infoWindow.setPosition(pos);
      infoWindow.setContent(
        browserHasGeolocation
          ? "Error: The Geolocation service failed."
          : "Error: Your browser doesn't support geolocation."
      );
      infoWindow.open(map);
    }

    const _addMarker = (location) => {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      markers.push(marker);
    }

    const _drawHeader = async () => {
      if (header.value !== '' && header.value.length > 0){
        let options = await getWeatherInput(header.value)
        let cities = ''
        if (options.length > 1) {
          for (let i of options) {
            cities = cities + `<option value="${i.title}"></option>`
          }
          header.innerHTML =
            `
              <datalist id="colores">
              ${cities}
              </datalist>
            `
        } else if (options.length === 1) {
            let latLng = options[0].latt_long
            latLng = latLng.split(',')
            _drawMap({ lat: parseInt(latLng[0]), lng: parseInt(latLng[1]) }, 6)
            _dataWeatherFnt(latLng[0], latLng[1])
        }
      }
    }

    _drawMap(miamiCity, 12)
    _dataWeatherFnt(miamiCity.lat, miamiCity.lng)
    _addMarker(miamiCity);
    header.addEventListener('keyup', await _drawHeader)

  });
}

export { Maps }