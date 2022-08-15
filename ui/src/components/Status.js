
import { Outlet,useNavigate } from 'react-router-dom'
import constant from '../config'
import React, { useState } from 'react'

export default function Status() {
  const [loginStatus, setLoginStatus] = useState(false)
  const navigate=useNavigate()

  async function deleteUser() {
    // console.log(sessionStorage.getItem('userToken'))
    try {
      const res = await fetch(
        constant.url + `api/user/delete`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
          }
        }
      )

      if (res.ok) {
        // alert('Got user details successfully')
        const user = await res.json()
        sessionStorage.removeItem('userToken')
        sessionStorage.removeItem('userName')
        console.log('user deleted')
        navigate('../')
      } else {
        console.log(res)
      }
    } catch (e) {
      console.log(`error:: ` + e)
    }

  }

  async function logoutUser() {
    // console.log(sessionStorage.getItem('userToken'))
    try {
      const res = await fetch(
        constant.url + `api/user/logout`,
        {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + sessionStorage.getItem('userToken'),
          }
        }
      )

      if (res.ok) {
        // alert('Got user details successfully')
        const user = await res.json()
        sessionStorage.removeItem('userToken')
        sessionStorage.removeItem('userName')
        console.log('user logout')
        navigate('../login')
      } else {
        console.log(res)
      }
    } catch (e) {
      console.log(`error:: ` + e)
    }

  }

  return (
    <>
      {sessionStorage.getItem('userToken')?.length > 0 ?
        <div className='logoutUser' onClick={logoutUser}>Logged in as {sessionStorage.getItem('userName')}</div>
        :
        <div>logged out</div>}
        <div className='deleteUser' onClick={deleteUser}>delete user</div>
      <Outlet />
    </>

  )
}
