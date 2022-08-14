import React, { useState } from 'react';

const defaultUser = {
  name: '',
  email: '',
  password: '',
  gender: '',
  phone: '',
  status: 'pending'
}

const App = () => {
  const [user, setUser] = useState(defaultUser)


  const handleOnChange = (e) => {
    const { name, value } = e.target
    console.log(name, value)

    setUser({
      ...user,
      [name]: value
    })
  }


  return (
    <>
      <h1>Register</h1>
      <form>
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
      </form>
    </>
  );
};

export default App;
