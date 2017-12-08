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
      let iconName = response.weather[0].main.toLowerCase();
      let driveLevel = 0;
      let color = "";

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
        driveLevel+=2;
        break;
        case "rainy":
        iconName = "weahter-rainy";
        driveLevel+=2;
        break;
        case "thunderstorm":
        iconName = "weahter-lightning-rainy";
        driveLevel+= 2;
        break;
        case "snow":
        iconName = "weahter-hail";
        driveLevel+= 2;
        break;
        case "mist":
        iconName = "weahter-cloudy";
        driveLevel+= 2;
        break;
      }

      if(response.visibility > 200 && response.visibility < 500){
        driveLevel++;
      }else if(response.visibility < 200){
        driveLevel+=2;
      }
      if(response.wind.speed > 10.8){
        driveLevel++;
      };

      switch (driveLevel) {
        case 1:
          message = "La météo est optimale. Faites tout de même attention";
          color: "#62b340";
          break;
        case 2:
          message = "La pluie peut rendre la chaussée glissante.";
          color: "#62b340";
        break;
        case 3:
          message = "Gardez vos distance, la conduite est difficile";
          color: "#FF8800";
          break;
        case 4:
          message = "Evitez de prendre le volant, la conduite est dangereuse";
          color: "#e52421";
        break;
        case 5:
          message = "La météo est dangereuse. Prenez le volant en cas d'extrême urgence";
          color: "#e52421";
        break;
        default:

      }

      const meteoInformation = {
          description: message,
          icon: iconName,
          temp: roundTemp,
          visibility: response.visibility,
          level: driveLevel,
          wind: response.wind.speed
      }
      return(meteoInformation);
    });
  }


}
