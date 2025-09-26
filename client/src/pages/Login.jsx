import React, { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    localStorage.setItem('token', res.token);
    // optional: localStorage.setItem('user', JSON.stringify(res.user));
    navigate('/');
  };

  return (
    <form className="auth-form" onSubmit={onSubmit}>
      <h2>Welcome back</h2>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
      <button type="submit">Log In</button>
    </form>
  );
}
