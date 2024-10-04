import React, { useRef, useState } from 'react'
import Card from '../components/Card';

function Home() {
  const[token,setToken] = useState(localStorage.getItem('token'))
  const nameRef = useRef();
  const priceRef = useRef();
  const descRef = useRef();
  const [data,setdata] = useState([])

  // function Validation() {
  //   if (nameRef.current.value.length < 3) {
  //     alert('berilgan name yaroqsiz')
  //     nameRef.current.focus()
  //     nameRef.current.style.outlineColor = 'red'
  //   }
  //   if (descRef.current.value.length < 3) {
  //     alert('berilgan description yaroqsiz')
  //     descRef.current.focus()
  //     descRef.current.style.outlineColor = 'red'
  //   }
  //   return true
  // }



  // function add_btn(e) {
  //   e.preventDefault();

  //   const isValid = Validation()
  //   if (!isValid) {
  //     return
  //   }

  //   const data = {
  //     "name" : nameRef.current.value,
  //     "price" : priceRef.current.value,
  //     "description" : descRef.current.value
  //   }
    
  //   fetch('https://auth-rg69.onrender.com/api/products/private/all ',{
  //     method : "POST",
  //     headers :{
  //       'Authorization': `Bearer ${token}`
  //     },
  //     body : JSON.stringify(data)
  //   })
  //   .then(function (res) {
  //     if (res.status == 200) {
  //       return res.json()
  //     }
  //   })
  //   .then(function (data) {
  //     console.log(data);
  //   })
    
  // }

  
  

  useEffect(function () {
    const token = token

      fetch('https://auth-rg69.onrender.com/api/products/private/all',{
          method : "GET",
          headers :{
              'Authorization':`Bearer ${token}`
          }
      })
      
      .then(function (res) {
          if (res.status==200) {
              return res.json()
          }
      })
      .then(function (data) {
        
          console.log(data);
          setdata(data)
          console.log(token);
      })
      .catch(function (err) {
          console.log(err);
      })
  },[])



  return (
    <>
      <div className='flex flex-col py-7 px-6 gap-3 my-16 container rounded-md max-w-[600px] mx-auto bg-green-300  '>
        <input className='px-3 py-2 rounded-md text-gray-800 ' ref={nameRef} type="text" placeholder='Enter name...' />
        <input className='px-3 py-2 rounded-md text-gray-800 ' ref={priceRef} type="number" placeholder='Enter price...'/>
        <input className='px-3 py-2 rounded-md text-gray-800 ' ref={descRef} type="text" placeholder='Enter something...' />
        <button className='bg-blue-400 py-2 px-3 rounded-md text-yellow-300' onClick={add_btn}>ADD CARD</button>
     </div>
     {data.length > 0 && data.map(function (product) {
            return <Card data={product} key={product.id}></Card>
        
          })}
    </>
  )
}

export default Home