import Header from '/src/templates/header.js'
import { Maps } from '/src/templates/map.js'
import Temp from './utils/Temp.js'

const temp = new Temp()
const render = async () => {
  document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('input').value = ''
  })
  await Header()
  await Maps(temp)
}


render()