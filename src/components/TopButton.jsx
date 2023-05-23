import React from 'react'

function TopButton({setQuery}) {

    const cities=[
        {
            id:1,
            title: "Delhi"
        },
        {
            id:2,
            title: "Sydney"
        },
        {
            id:3,
            title: "London"
        },
        {
            id:4,
            title: "Mumbai"
        },
    ]

  return (<div  className='flex items-center justify-around my-6'>
    {cities.map((city) => (
        <button key={city.id} className='text-white text-lg font-medium' onClick={() => setQuery({q: city.title})}>{city.title}</button>
  ))}    
    </div>
  );
}
export default TopButton;
