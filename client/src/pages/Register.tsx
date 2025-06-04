import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken } from '../utils/auth';

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'educator' | 'admin';
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || data.errors?.[0]?.msg || 'Registration failed');
        return;
      }

      // Success
      setToken(data.token);
      const role = data.user.role;
      navigate(`/${role}`);
    } catch (err) {
      console.error('Register error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h2>Register</h2>

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
      />

      <select name="role" value={form.role} onChange={handleChange}>
        <option value="student">Student</option>
        <option value="educator">Educator</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default Register;
