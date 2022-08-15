import React, { useEffect, useState } from 'react';
import constant from '../config'
import { useNavigate } from 'react-router-dom'
const defaultUser = {
  name: "default",
  email: 'mny@gmail.com',
  password: '123456',
  phone: '000',
  gender: 'm',
  status: 'f'
}

const UserUpdate = () => {
  const [user, setUser] = useState(defaultUser)
  const { name, email, phone, gender, status } = user
  const navigate = useNavigate()


  useEffect(async () => {
    const userData=(await getDetails())
    setUser({
      name:userData.name,
      email:userData.email,
      phone:userData.phone,
      gender:userData.gender,
      status:userData.status,
    })
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    console.log(user)

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
        constant.url + `api/user/update`,
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
        // alert('update successfully')
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
      <h1>User Update</h1>
      <form onSubmit={handleSubmit}>
        <label> name </label>
        <input
          value={name}
          name='name'
          onChange={handleOnChange}
        />
        <label> email </label>
        <input
          value={email}
          name='email'
          onChange={handleOnChange}
        />

        <label> gender </label>
        <input
          value={gender}
          name='gender'
          onChange={handleOnChange}
        />
        <label> phone </label>
        <input
          value={phone}
          name='phone'
          onChange={handleOnChange}
        />
        <label> status </label>
        <input
          value={status}
          name='status'
          onChange={handleOnChange}
        />
        <button>submit</button>
        <button type='button' onClick={() => navigate('../details')}>Goto details</button>
      </form>


    </>
  );
};

export default UserUpdate;
