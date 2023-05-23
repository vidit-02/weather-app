import React from 'react'
import { iconUrlFromCode } from '../services/WeatherService';

function Forecast({title,items}) {
  return (
    <div >
        
        <p className='flex items-center justify-start mt-6 text-white font-medium'>{title}</p>
        <hr className='my-2' />
        <div className='flex items-center justify-between text-white'>
           {items.map((item) => (
            <div className='flex flex-col items-center justify-center'>
            <p className='font-light text-sm'>{item.title}</p>
            <img src={iconUrlFromCode(item.icon)} alt="imgs" className='w-12 my-1'/>
            <p className='font-medium'>{`${item.temp}°`}</p>
           </div>

            ))}
           

           
        </div>
    </div>
  )
}

export default Forecast;
