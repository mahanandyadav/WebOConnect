import React, { useEffect, useState } from 'react';
import constant from '../config'
import { useNavigate } from 'react-router-dom'
const defaultUser = {
  email: '',
  password: '',
  new_password: '',
  conform_password: ''
}

const PasswordUpdate = () => {
  const [user, setUser] = useState(defaultUser)
  const navigate = useNavigate()


  useEffect(async () => {
    const userData = (await getDetails())
    setUser({
      ...user,
      email: userData.email,

    })
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setUser({
      ...user,
      [name]: value
    })
  }

  async function getDetails() {
    // console.log(sessionStorage.getItem('userToken'))
    try {
      const res = await fetch(
        constant.url + `api/user/details`,
        {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
          }
        }
      )

      if (res.ok) {
        // alert('Got user details successfully')
        return (await res.json())
      } else {
        console.log(res)
      }
    } catch (e) {
      console.log(`error:: ` + e)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        constant.url + `api/user/update_password`,
        {
          method: 'PATCH',
          headers:
          {

            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken')
          
          },
          body: JSON.stringify(user),
        }
      )

      if (res.ok) {
        // alert('Password update successfully')
        console.log(await res.json())
      } else {
        console.log(res)
      }
    } catch (e) {
      console.log(`error:: ` + e)
    }

  }


  return (
    <main className='container'>
      <div className="container-box">

      <h1 className='heading'>Password Update</h1>
      <p>{user.email}</p>
      <form onSubmit={handleSubmit} className='form'>
        <div className="form-item">

        <label> Old password </label>
        <input
          value={user.password}
          name='password'
          onChange={handleOnChange}
          />
          </div>
          <div className="form-item">

        <label> new  password </label>
        <input
          value={user.new_password}
          name='new_password'
          onChange={handleOnChange}
          />
          </div>
          <div className="form-item">

        <label> Conform  password </label>
        <input
          value={user.conform_password}
          name='conform_password'
          onChange={handleOnChange}
          />
          </div>

          <div className="form-btn">


        <button
          disabled={(user.new_password !== user.conform_password || user.new_password.length < 1) || user.password.length<1}
          >submit</button>
        <button type='button' onClick={() => navigate('../details')}>Goto details</button>
          </div>
      </form>


          </div>
    </main>
  );
};

export default PasswordUpdate;
