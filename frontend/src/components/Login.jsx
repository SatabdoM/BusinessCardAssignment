import React, { useContext, useEffect } from 'react'
import { useState,} from 'react';
import { NavLink,useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';

const Login = () => {
    const {authToken,setAuthToken}=useContext(AuthContext);
    const [formData, setFormData] = useState({ username: "", password: "" });
    
  const navigate=useNavigate();

  function changeHandler(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }
  

  async function submitHandler(event) {
    event.preventDefault(); 
    try{
      const response=await axios.post('http://localhost:4000/user/login',formData);
      setAuthToken(response.data.token);
      console.log(authToken);
      alert(response.data.msg);
      navigate('/home');
    }
    catch (error) {
      if (error.response && error.response.status === 404) {
          console.error('Login failed:', error.response.data.msg);
          alert('User Does Not exist. Please Sign Up');
          navigate('/signup')
      }
      else if(error.response && error.response.status === 401){
        console.error('Login failed:', error.response.data.msg);
        alert('Passwords do not match. Please Try Again')
      }
      else {
          // Handle other types of errors (e.g., network issues)
          console.error('Unexpected error:', error.message);
      }
  }
    
    
  }

  return (
    <>
      <p>Log In</p>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={formData.username}
          onChange={changeHandler}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={changeHandler}
        />
        <br />
        <button type="submit">Log In</button>
      </form>
      <div>
        <p>New User?</p>
        <NavLink to="/signup">
          <button>Sign Up</button>
        </NavLink>
      </div>
    </>
  );
  
}

export default Login