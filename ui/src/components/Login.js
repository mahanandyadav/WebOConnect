import React, { useState } from 'react';
import constant from '../config'
import { useNavigate ,Outlet} from 'react-router-dom'
const defaultUser = {
  email: 'mny@gmail.com',
  password: '123456'
}

const Login = () => {
  const [user, setUser] = useState(defaultUser)
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target
    console.log(user)

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        constant.url + `api/user/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        }
      )

      if (res.ok) {
        // alert('Login successfully')
        let {user,token}=await res.json()
        console.log(user,token)
        sessionStorage.setItem('userToken',token)
        sessionStorage.setItem('userName',user.name)
        navigate('/user/details',{replace:true})
      } else {
        console.log(res)
      }
    } catch (e) {
      console.log(`error:: ` + e)
    }

  }

  const handleNavigate = (e) => {
    e.preventDefault()
    navigate('/')
  }


  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <label> email </label>
        <input
          value={user.email}
          name='email'
          onChange={handleOnChange}
        />
        <label> password </label>
        <input
          value={user.password}
          name='password'
          onChange={handleOnChange}
        />
        <button
          type='submit'
        >submit
        </button>

        <button
          type='button'
          onClick={handleNavigate}
        >Goto Register</button>
      </form>
    </>
  );
};

export default Login;
