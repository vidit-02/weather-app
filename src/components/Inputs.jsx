import React, { useState } from 'react'
import { UilSearch } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import axios from 'axios';

export default function Inputs({setQuery, units, setUnit}) {
   
    const [city,setCity]=useState('');
   
    const [suggestions, setSuggestions] = useState([]);
    
    const handleCityChange = (event) => {
        const enteredCity = event.target.value;
        setCity(enteredCity);
        
    
        if (enteredCity.length > 2) {
          fetchCitySuggestions(enteredCity);
        } else {
          setSuggestions([]);
        }
      };

    const fetchCitySuggestions = (query) => {
        const apiKey = '5fb4f251073646eea8b8abdb344e18c6';
        const apiUrl = `https://api.openweathermap.org/data/2.5/find?q=${query}&type=like&sort=population&appid=${apiKey}`;
    
        axios
          .get(apiUrl)
          .then((response) => {
            const citySuggestions = response.data.list.map((item) => item.name);
            setSuggestions(citySuggestions);
          })
          .catch((error) => {
            console.log(error);
          });
    };

    const handleSuggestionClick = (suggestion) => {
        setCity(suggestion);
        setSuggestions([]);
      };
    

    const handleClick=() =>{
        if (city!=='') 
        setQuery({q: city});
        setCity('');

    };
    const handleLocClick= () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                let lat=position.coords.latitude;
                let lon=position.coords.longitude;

                setQuery({
                    lat,lon,
                });
            });
        }
    }

    const handleUnitClick = (e) =>{
  
        const selectedUnit=e.currentTarget.name;
         if(units!== selectedUnit)  
         setUnit(selectedUnit);
    };

  return (
    <div className='flex flex-row justify-around my-6'>  
      <div className='flex flex-row w-3/4 items-center justify-between space-x-4'>
        <div flex flex-col>
        <input 
        type='text'
        className='flex flex-col text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize' 
        placeholder='search for city ..'
        value={city}
        onChange={handleCityChange}>
        </input>
        {suggestions.length > 0 && (
            <ul className='flex-col w-64 bg-slate-500 mt-2 border border-violet-500 rounded-sm shadow-sm max-h-32 overflow-y-auto '>
              {suggestions.map((suggestion, index) => (
                <li className="  border border-white  text-white px-4 py-2  cursor-pointer " key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
        )}
        </div>
        <UilSearch  onClick={handleClick} size={25} className="text-white cursor-pointer"/>
        <UilLocationPoint onClick={handleLocClick}size={25} className="text-white cursor-pointer" />
      </div>
      
      <div className='flex flex-row w-1/4 items-center justify-center '>
         <button onClick={handleUnitClick} name='metric' className='text-xl text-white font-light'>°C</button>
         <p className='text-xl text-white font-light mx-1'>/</p>
         <button onClick={handleUnitClick} name='imperial' className='text-xl text-white font-light'>°F</button>
      </div>   
    
    </div>
  )
}
