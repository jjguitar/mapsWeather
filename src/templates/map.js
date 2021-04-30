import { Loader } from "@googlemaps/js-api-loader"
import '../assets/styles/Map.scss'
import { viewTemp } from '../templates/viewTemp.js'

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
    await viewTemp(temp)

    map.addListener("click", async (event) => {
      clearMarkers()
      console.log('event.latLng')
      console.log(event.latLng)
      addMarker(event.latLng);

      let lat = event.latLng.lat()
      let lng = event.latLng.lng()
      dataWhether = await _getWOEID(lat, lng)
      console.log(dataWhether.woeid)
      dataWhether = await _getWeather(dataWhether.woeid)
      await temp.setDataWhether(dataWhether)
      // console.log(dataWhether)
      await viewTemp(temp)
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

    let header = document.getElementById('input')
    const drawHeader = async () => {
      console.log(header.value)
      if (header.value !== '' && header.value.length > 0){
        let options = await _getWeatherInput(header.value)
        let cities = ''
        if (options.length > 1) {
          for (let i of options) {
            // cities.push(i.title)
            cities = cities + `<option value="${i.title}"></option>`
          }
          header.innerHTML = `
            <datalist id="colores">
            ${cities}
            </datalist>
          `
        } else if(options.length === 1) {
          let latLng = options[0].latt_long
          latLng = latLng.split(',')
          console.log(latLng)
          map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: parseInt(latLng[0]), lng: parseInt(latLng[1]) },
            zoom: 6,
          });
          
          dataWhether = await _getWOEID(latLng[0], latLng[1])
          console.log(dataWhether.woeid)
          dataWhether = await _getWeather(dataWhether.woeid)
          await temp.setDataWhether(dataWhether)
          await viewTemp(temp)
          map.addListener("click", async (event) => {
            clearMarkers()
            console.log('event.latLng')
            console.log(event.latLng)
            addMarker(event.latLng);
      
            let lat = event.latLng.lat()
            let lng = event.latLng.lng()
            dataWhether = await _getWOEID(lat, lng)
            console.log(dataWhether.woeid)
            dataWhether = await _getWeather(dataWhether.woeid)
            await temp.setDataWhether(dataWhether)
            // console.log(dataWhether)
            await viewTemp(temp)
            // let maxTemp = dataWhether.consolidated_weather[0].max_temp
            // drawWhether(maxTemp)
            // console.log(temp.getTimezone())
            // console.log(event.latLng.lat())
            // console.log(event.latLng.lng())
          });
        }
      }
    }
    header.addEventListener('keyup', await drawHeader)

    const _getWeatherInput = async (val) => {
      const apiURL = `https://www.metaweather.com/api/location/search/?query=${val}`
      try {
        const response = await fetch(apiURL)
        const data = await response.json()
        console.log(data)
        return data
      } catch (err) {
        console.log('Fetch Error', err)
      }
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