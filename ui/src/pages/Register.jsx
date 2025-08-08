import React from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import AuthForm from '../components/AuthForm/AuthForm';

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await registerUser(data);
      alert('Registration successful');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <AuthForm onSubmit={handleRegister} buttonText="Register" />
    </div>
  );
};

export default Register;
