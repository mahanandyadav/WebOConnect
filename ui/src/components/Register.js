import React, { useState } from 'react';
import constant from '../config'
import {useNavigate} from 'react-router-dom'
const defaultUser = {
  name: 'mahanand',
  email: 'mny@gmail.com',
  password: '123456',
  gender: 'male',
  phone: 1234567890,
  status: 'pending'
}

const Register = () => {
  const [user, setUser] = useState(defaultUser)
  const navigate=useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        constant.url + `api/user/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        }
      )

      if (res.ok) {
        // alert('register successfully')
        console.log(await res.json())
      } else {
        console.log(res)
      }
    } catch (e) {
      console.log(`error:: ` + e)
    }

  }


  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label> name </label>
        <input
          value={user.name}
          name='name'
          onChange={handleOnChange}
        />
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
        <label> gender </label>
        <input
          value={user.gender}
          name='gender'
          onChange={handleOnChange}
        />
        <label> phone </label>
        <input
          value={user.phone}
          name='phone'
          onChange={handleOnChange}
        />
        <label> status </label>
        <input
          value={user.status}
          name='status'
          onChange={handleOnChange}
        />
        <button>submit</button>
        <button type='button' onClick={()=>navigate('/login')}>Goto Login</button>
      </form>
    </>
  );
};

export default Register;
