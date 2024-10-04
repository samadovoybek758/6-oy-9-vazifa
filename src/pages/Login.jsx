import React, { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const loginRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate()

  function Validation() {
    if (loginRef.current.value.length < 3) {
      alert("login yaoqsiz")
      loginRef.current.focus(
      loginRef.current.style.outlineColor = "red"
      )
    }
    return true
  }



  function login_btn(e) {
    e.preventDefault()

    console.log(passwordRef.current.value);
    const isValid = Validation()
    if (!isValid) {
      return
    }

    const user = {
      username: loginRef.current.value,
      password: passwordRef.current.value
    }
    
    fetch('https://auth-rg69.onrender.com/api/auth/signin',{
      method : "POST",
      headers : {
        'Content-type':'application/json'
      },
      body : JSON.stringify(user)
    })
    .then(function (res) {
      if (res.status == 200) {
        return res.json()
      }
    })
    .then(function (data) {
      if (data.id) {
        localStorage.setItem('token', data.accessToken);
        localStorage.setItem('user' ,JSON.stringify(data))
        navigate('/')
      }
      if (data.message == "User Not found." || data.message == "Invalid Password!") {
        alert("username yoki parolda xatolik")
      }
    })
    .catch(err => (console.log(err)))

  }
  return (
    <div className='flex flex-col my-24 mx-auto w-[500px] border-solid border  border-gray-700 py-5 rounded-md px-5 gap-3'>
       <h1 className='text-4xl mb-4 text-center text-blue-500'>Login page</h1>
      <input  ref={loginRef} className='py-2 border border-solid border-fuchsia-800 bg-neutral-500 text-white px-2 rounded-md text-xl' type="text" placeholder='Enter login...'/>
      <input ref={passwordRef}  className='py-2  bg-neutral-500 text-white px-2 rounded-md text-xl' type="password" placeholder='Enter password..' />
      <button className='py-2 px-2 bg-blue-400 rounded-md text-2xl text-gray-700' onClick={login_btn}>Button</button>
      <Link to="/register">Registerga o'tish</Link>
    </div>
  )
}

export default Login