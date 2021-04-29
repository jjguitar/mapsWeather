import { Loader } from "@googlemaps/js-api-loader"
import '../assets/styles/Map.scss'
import ViewTemp from '../templates/viewTemp.js'

const Maps = (temp) => {

  let map;
  let dataWhether;
  let markers = [];
  const bogotaCity = { lat: 4.6512, lng: -74.0758 };

  const loader = new Loader({
    apiKey: "AIzaSyBQhS6W62IbuMFMsNOCAwYWQcXIYWC7N0c",
    version: "weekly",
  });


  loader.load().then(async () => {
    map = new google.maps.Map(document.getElementById("map"), {
      center: bogotaCity,
      zoom: 12,
    });
    dataWhether = await _getWOEID(bogotaCity.lat, bogotaCity.lng)
    console.log(dataWhether.woeid)
    dataWhether = await _getWeather(dataWhether.woeid)
    await temp.setDataWhether(dataWhether)
    await ViewTemp(temp)

    map.addListener("click", async (event) => {
      clearMarkers()
      addMarker(event.latLng);

      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      dataWhether = await _getWOEID(lat, lng)
      console.log(dataWhether.woeid)
      dataWhether = await _getWeather(dataWhether.woeid)
      await temp.setDataWhether(dataWhether)
      console.log(dataWhether)
      await ViewTemp(temp)
      // let maxTemp = dataWhether.consolidated_weather[0].max_temp
      // drawWhether(maxTemp)
      // console.log(temp.getTimezone())
      // console.log(event.latLng.lat())
      // console.log(event.latLng.lng())
    });

    const addMarker = (location) => {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      markers.push(marker);
    }

    addMarker(bogotaCity);

  });

  const setMapOnAll = (map) => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  const clearMarkers = () => setMapOnAll(null);
}

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

export { Maps }