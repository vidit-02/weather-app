import React, { useEffect, useState } from "react";
import TopButton from "./components/TopButton";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempDesc from "./components/TempDesc";
import Forecast from "./components/Forecast";
//import getWeatherData from "./services/WeatherService";
import getFormattedWeatherData from "./services/WeatherService";

function App() {

  const [query, setQuery] = useState({q:'Delhi'});  //to search by city name, Delhi being the default city 
  const [units, setUnit] =useState('metric');        //to convert data from celcius to farenhit and vice versa
  const [weather,setWeather] =useState(null);        //to get the weather data

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query,units}).then(data => {setWeather(data);});
    };

    fetchWeather();
  },[query,units])   //means that this react hook will call the function fetchWeather whenever the query or the units are changed
  
  const formatBg = () => {
    if(!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === 'metri'?20:60;
    if(weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  }
  

  return <div className={`mx-auto max-w-screen-md  py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400 ${formatBg()}`}>
  <TopButton setQuery={setQuery} />
  <Inputs setQuery={setQuery} units={units} setUnit={setUnit} />
  {weather && (<div>
    <TimeAndLocation weather={weather}/>
    <TempDesc weather={weather}/>
    <Forecast title="HOURLY FORECAST" items={weather.hourly}/>
    <Forecast title="DAILY FORECAST" items={weather.daily}/>
    </div>)}
 
  </div>  
 
}

export default App;
