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

      const roundTemp =  Math.round(temperature.celcius);
      let message = "";
      console.log(response.weather[0].main);

      let iconName = response.weather[0].main.toLowerCase();
      let driveLevel = 0;

      switch(iconName){
        case "clear sky":
        iconName = "weahter-sunny";
        break;
        case "few clouds":
        iconName = "weahter-partlycloudy";
        break;
        case "scattered clouds":
        iconName = "weahter-cloudy";
        break;
        case "broken clouds":
        iconName = "weahter-cloudy";
        break;
        case "shower rain":
        iconName = "weahter-pouring";
        break;
        case "rain":
        iconName = "weahter-rainy";
        break;
        case "thunderstorm":
        iconName = "weahter-lightning-rainy";
        break;
        case "snow":
        iconName = "weahter-hail";
        break;
        case "mist":
        iconName = "weahter-cloudy";
        break;
      }


     if(roundTemp > 3){
        if(response.weather[0].main.includes("rain")){
            message = "Attention ! La pluie risque de rendre la chaussée glissante";
            driveLevel = 4;
        }else if(response.visibility < 5000){
            message = "Attention ! visibilité est réduite ! Gardez vos distances.";
            driveLevel = 2;
        }
        else{
            message = "La météo est optimale pour la route";
            driveLevel = 1;
        }
      }
      else if(roundTemp < 3){
        if(response.visibility < 5000){
          message = "Attention ! Risque de plaque verglassante et la visibilité est réduite. Faites attention !";
          driveLevel = 2;
        }
        else{
          message = "Attention ! Risque de plaque verglassante";
          driveLevel = 2;
        }
      }else if(roundTemp < 0){
        if(response.visibility < 5000){
          message = "Faites attention !La visibilité est réduite. Les température annonce des chaussées très glissantes.";
          driveLevel = 5;
        }
        else{
          message = "Attention ! Les chaussés sont très glissante.";
          driveLevel = 4;
       }
      }

      const meteoInformation = {
          description: message,
          icon: iconName,
          temp: roundTemp,
          visibility: response.visibility,
          wind: response.wind.speed,
          level: driveLevel
      }
      return(meteoInformation);
    });
  }


}
