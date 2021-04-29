import Header from '/src/templates/header.js'
import { Maps } from '/src/templates/map.js'
import Temp from './utils/Temp.js'

const temp = new Temp()
const render = async () => {
  await Header()
  await Maps(temp)
}


render()