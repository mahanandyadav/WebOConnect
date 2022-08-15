import React, { useEffect, useState } from 'react';
import constant from '../config'
import { useNavigate ,Link} from 'react-router-dom'
const defaultUser = {
  name: "default",
  email: 'mny@gmail.com',
  password: '123456',
  phone: '000',
  gender: 'm',
  status: 'f'
}

const UserDetails = () => {
  const [user, setUser] = useState(defaultUser)
  const navigate = useNavigate()


  useEffect(async () => {
    setUser(await getDetails())
  }, [])
  const { name, email, phone, gender, status } = user


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

  const handleNavigate = (e) => {
    e.preventDefault()
    // navigate('update')
    // window.navigator('/update')
    // history.push('/update')
    history.navigate('/update')
  }


  return (
    <>
      <h1>User Details</h1>
      <p>name</p>
      <p>{name}</p>
      <p>email</p>
      <p>{email}</p>
      <p>phone</p>
      <p>{phone}</p>
      <p>gender</p>
      <p>{gender}</p>
      <p>status</p>
      <p>{status}</p>
      <Link
        to='../update'
      >Update Details
      </Link>


      <button
        type='button'
        onClick={()=>navigate('../update_password')}
      >Update Password</button>

    </>
  );
};

export default UserDetails;
