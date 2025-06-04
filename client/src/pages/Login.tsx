import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setToken(data.token);
        const role = data.user.role;
        navigate(`/${role}`);
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
