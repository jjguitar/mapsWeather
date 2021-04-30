import '../assets/styles/Header.scss'

const Header = () => {
  // let header = document.getElementById('input')
  // header.addEventListener('change', async () => {
  //   console.log(header.value)
  //   let options = await _getWeatherInput(header.value)
  //   let cities = ''
  //   for (let i of options) {
  //     // cities.push(i.title)
  //     cities = cities + `<option value="${i.title}"></option>`
  //   }
  //   header.innerHTML = `
  //     <datalist id="colores">
  //     ${cities}
  //     </datalist>
  //   `
  // })
}

// const _getWeatherInput = async (val) => {
//   const apiURL = `https://www.metaweather.com/api/location/search/?query=${val}`
//   try {
//     const response = await fetch(apiURL)
//     const data = await response.json()
//     console.log(data)
//     return data
//   } catch (err) {
//     console.log('Fetch Error', err)
//   }
// }

export default Header


// header.innerHTML = `
//     <datalist id="colores">
//         <option value="Azul"></option>
//         <option value="Amarillo"></option>
//         <option value="Burdeos"></option>
//         <option value="Caoba"></option>
//         <option value="Marrón"></option>
//         <option value="Naranja"></option>
//         <option value="Verde"></option>
//     </datalist>
//   `