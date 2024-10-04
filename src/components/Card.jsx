import React, { useEffect, useState } from 'react'

function Card(props) {
    console.log(props);
   const {name,price,description,id} = props.data
    
            return (
              <div key={id} className='flex flex-col p-3 gap-2 mx-auto w-[300px] border border-solid rounded-md shadow-violet-400'>
                <h1>Name: {name}</h1>
                <h2>Price: ${price}</h2>
                <h2>Description: {description}</h2>
              </div>
            );
      
      
    }
export default Card