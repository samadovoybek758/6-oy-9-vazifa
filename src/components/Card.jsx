import React, { useEffect, useState } from 'react'

function Card(props) {
   const {name,price,description,id} = props.data;
   const{delItem} = props
    
            return (
              <div key={id} className='flex flex-col p-3 gap-2 mx-auto w-[300px] border border-solid rounded-md shadow-violet-400'>
                <h1>Name: {name}</h1>
                <h2>Price: ${price}</h2>
                <h2>Description: {description}</h2>
                <button onClick={()=> {delItem(id)}} className='bg-slate-500 px-3 py-1'>Delet</button>
              </div>
            );
      
      
    }
export default Card