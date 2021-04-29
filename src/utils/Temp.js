export default class Temp {
  constructor() {
    this.consolidated_weather
    this.timezone
    this.title
  }

  getTimezone() {
    return this.timezone
  }

  setDataWhether(dataWhether) {
    this.consolidated_weather = dataWhether !== undefined ? dataWhether.consolidated_weather : 'Desconocido'
    this.timezone = dataWhether !== undefined ? dataWhether.timezone : 'Desconocido'
    this.title = dataWhether !== undefined ? dataWhether.title : 'Desconocido'
  }
}