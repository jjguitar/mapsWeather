const getWOEID = async (lat, lng) => {
  const apiURL = `https://www.metaweather.com/api/location/search/?lattlong=${lat},${lng}`
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    return data[0]
  } catch (err) {
    console.log('Fetch Error', err)
  }
}

const getWeather = async (woeid) => {
  const apiURL = `https://www.metaweather.com/api/location/${woeid}/`
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    return data
  } catch (err) {
    console.log('Fetch Error', err)
  }
}

const getWeatherInput = async (val) => {
  const apiURL = `https://www.metaweather.com/api/location/search/?query=${val}`
  try {
    const response = await fetch(apiURL)
    const data = await response.json()
    return data
  } catch (err) {
    console.log('Fetch Error', err)
  }
}

export { getWOEID, getWeather, getWeatherInput}