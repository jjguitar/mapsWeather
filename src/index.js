import Clear from '/src/templates/clear.js'
import { Maps } from '/src/templates/map.js'
import Temp from './utils/Temp.js'

const temp = new Temp()
const render = async () => {
  await Clear()
  await Maps(temp)
}


render()