import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm/AuthForm';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await loginUser(data);
      console.log(res)
      login(res.data.access_token, res.data.refresh_token);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };
  

  return (
    <div>
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
    </div>
  );
};

export default Login;
