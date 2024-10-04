import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const reppasswordRef = useRef()
    const formRef = useRef()

    const navigate = useNavigate()
    const[loding,setloding] = useState(false)


    const validateEmail = (email) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    function Validate() {
      if (usernameRef.current.value.length <3) {
        alert("username yaroqsiz")
        usernameRef.current.focus()
        usernameRef.current.style.outlineColor = 'red'
        return false
      }
      if (!validateEmail(emailRef.current.value)) {
        alert('email yaroqsiz');
        emailRef.current.focus()
        emailRef.current.style.outlineColor = 'red'
        return false
      }

      if (passwordRef.current.value != reppasswordRef.current.value) {
        alert('parolda muammo bor')
        reppasswordRef.current.focus()
        reppasswordRef.current.style.outlineColor = 'red'
        return false
      }
      return true
    }


    function handleclick(e) {
        e.preventDefault()

        setloding(true)

        const isValidate = Validate()
        if (!isValidate) {
          return
        }


        const user ={
          "username" : usernameRef.current.value,
          "email" : emailRef.current.value,
          "password" : passwordRef.current.value
        }
        
        fetch('https://auth-rg69.onrender.com/api/auth/signup',{
          method : 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
        })

        .then(function (res) {
          if (res.status == 200) {
            return res.json()
          }
        })
        .then(function (data) {
          if (data.message == "User registered successfully!") {
            navigate('/Login')
            formRef.current.value = ''
          }
          if (data.message == "Failed! Username is already in use!" || data.message == "Faild! Email is already in use!") {
            alert(data.message)
          } 
        })
        .catch(function (err) {
          console.log(err);
        })
        .finally(function () {
            setloding(false)
        })

    }
  return (
    <form ref={formRef} className='flex flex-col my-24 mx-auto w-[500px] border border-solid border-gray-600 py-5 rounded-md px-5 gap-3'>
        <h1 className='text-4xl mb-4 text-center text-gray-600'>Register page</h1>
        <input ref={usernameRef}  className='outline-fuchsia-700 bg-gray-500 text-white py-2 px-2 rounded-md text-xl' type="text" placeholder='Enter username...' />
        <input ref={emailRef} className='bg-gray-500 text-white py-2 px-2 rounded-md text-xl' type="email" placeholder='Enter email...' />
        <input ref={passwordRef} className='bg-gray-500 text-white py-2 px-2 rounded-md text-xl' type="password" placeholder='Enter password...' />
        <input ref={reppasswordRef} className='bg-gray-500 text-white py-2 px-2 rounded-md text-xl' type="password" placeholder='Enter password reply...' />

        <button disabled = {loding}  onClick={handleclick} className='py-2 px-2 bg-blue-300 rounded-md text-2xl text-gray-600'>{loding ? "LODING" : "REGISTER"}</button>
        <Link to='/login'>LOGINGA o'tish</Link>
    </form>
  )
}

export default Register