import { DateTime } from "luxon";

const API_KEY="5fb4f251073646eea8b8abdb344e18c6";
const BASE_URL="https://api.openweathermap.org/data/2.5";

const getWeatherData=(infoType, searchParams) =>{
    const url=new URL(BASE_URL+'/'+ infoType);
    url.search=new URLSearchParams({...searchParams,appid:API_KEY})
    
    return fetch(url).then((res)=> res.json());

};
//here the data will be from the https://api.openweathermap.org/data/2.5/weather.. api to get current weather data only
const formatCurrentWeather = (data) => {
    //destructuring the api data
    const{
        coord:{lat,lon},
        main:{temp,feels_like,temp_min, temp_max, humidity},
        name,
        dt,
        sys:{country,sunrise,sunset},
        weather,
        wind:{speed}
    }=data

    const {main: details,icon} = weather[0];

    return {lat,lon,temp,feels_like,temp_min, temp_max, humidity,name,dt,country,sunrise,sunset,details,icon,speed};

}

//here the data will be from https://api.openweathermap.org/data/2.5/onecall.. api which takes lat and lon to generate hourly and daily weather forecast
const formatForecastWeather= (data) => {
    let {timezone, daily, hourly} = data;
    daily= daily.slice(1,6).map(d=>{         //slice is to take daily forecast for 5 days starting from the next day (index 1) to index 6
        return{
            title:formatToLocalTime(d.dt, timezone, 'ccc'),  //ccc  being format for day ie tue mon etc
            temp: d.temp.day,
            icon: d.weather[0].icon
        }
    });

    hourly= hourly.slice(1,6).map(d=>{        //slice is to take hourly forecast for 5 hours starting from the next hour (index 1) to index 6
        return{
            title:formatToLocalTime(d.dt, timezone, 'hh:mm a'),   
            temp: d.temp,
            icon: d.weather[0].icon
        }
    });
    

    return {timezone,daily,hourly};
}


const getFormattedWeatherData = async (searchParams) => {
    const formattedCurrentWeather= await getWeatherData('weather',searchParams).then(data=> formatCurrentWeather(data));

    const{lat,lon}=formattedCurrentWeather;

    const formattedForecastWeather= await getWeatherData('onecall',{
        lat,
        lon,
        exclude: 'current,minutely,alert',units: searchParams.units,
        }).then(data => formatForecastWeather(data));
    
    return {...formattedCurrentWeather, ...formattedForecastWeather};
}

//using npm i luxon it install this lib for date and time manipulation
const formatToLocalTime= (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export {formatToLocalTime, iconUrlFromCode };

