const getMeteo = (ville) => {
    return fetch('http://api.openweathermap.org/data/2.5/weather?q='+ ville +'&appid=591a82496f056b1939408ade0da061d0')
      .then(function(response) {
        return response.json()
      })
      .catch(function(ex) {
        console.log('parsing failed', ex)
      })
}

module.exports = {
  getMessage: (ville) => {
    return getMeteo("Strasbourg").then((response) => {
      const iconUrl = 'http://openweathermap.org/img/w/'+response.weather[0].icon+'.png'
      let temperature = {
        kelvin: response.main.temp,
        celcius: response.main.temp - 275.15
      }

      const roundTemp =  Math.round(temperature.celcius))

      if(temperature.celcius < 10){
        console.log("en dessous de 10");
      }else{
        console.log("au dessus de 10");
      }

      const meteoInformation = {
          message: "lama",
          icon: iconUrl,
          temp: roundTemp,
          visibility: response.visibility,
          wind: response.wind.speed,
      }
      return(meteoInformation);
    });
  }


}
