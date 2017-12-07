import './App.scss';

import meteo from './meteo/meteo.js';

let ville = "Strasbourg";

let met = meteo.getMessage(ville)
met.then((response) => {
  console.log(response);
})
