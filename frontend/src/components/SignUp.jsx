import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  function changeHandler(event) {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/user/signup",
        formData
      );
      console.log(response);
      alert(response.data.msg);
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Invalid Details. Please Try Again");
    }
  }

  return (
    <>
      <p>Sign Up</p>
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
        <button type="submit">Sign Up</button>
      </form>
      <div>
        <p>Already a member?</p>
        <NavLink to="/login">
          <button>Log In</button>
        </NavLink>
      </div>
    </>
  );
};

export default SignUp;
