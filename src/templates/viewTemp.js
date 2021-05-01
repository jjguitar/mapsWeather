import '../assets/styles/ViewTemp.scss'

const viewTemp = (temp) => {
  let tempView = document.getElementById('viewTemp')
  let temps = temp.getWeather()
  let block = ''
  for (let i = 1; i < temps.length - 1; i++) {
    let icon = `https://www.metaweather.com/static/img/weather/${temps[i].weather_state_abbr}.svg`
    block = block + `
      <div class="weather">
        <h3>${i === 1 ? 'Tomorrow' : dateToString(temps[i].applicable_date)}</h3>
        <img src="${icon}" width="60" height="60">
        <div class="temps">
          <p>${Math.round(temps[i].max_temp)}°C</p>
          <p>${Math.round(temps[i].min_temp)}°C</p>
        </div>
      </div>
    `
  }

  block = block + `
      <div class="weather">
        <h3>${dateToString(temps[0].applicable_date)}</h3>
        <img src="https://www.metaweather.com/static/img/weather/${temps[0].weather_state_abbr}.svg" width="40" height="40">
        <div class="temps">
          <p>${Math.round(temps[0].max_temp)}°C</p>
          <p>${Math.round(temps[0].min_temp)}°C</p>
        </div>
      </div>
    `

  tempView.innerHTML = block
}

const dateToString = (date) => {
  let dat = new Date(date)
  var options = { weekday: 'short', day: 'numeric', month: 'short' };
  return dat.toLocaleDateString("en-EN", options)
}

export { viewTemp }