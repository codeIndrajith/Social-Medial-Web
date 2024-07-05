/* eslint-disable react/no-unescaped-entities */
//import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        'http://localhost:5454/auth/login',
        userData
      );
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/');
      toast.success('Login complete');
    } catch (error) {
      toast.error('User not found');
    }
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>
            -
            <br />
            FitVerse <br />-
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit adipisci totam nam harum dolores in explicabo
            reiciendis cum numquam magni?
          </p>
          <span>Don't have an account? </span>
          <Link to="/signup">
            <button className="btn btn-primary">Signup</button>
          </Link>
        </div>
        <form className="right" onSubmit={submitHandler}>
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
