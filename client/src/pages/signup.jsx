import React, { useState } from 'react';
import { signup } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await signup(form);
    alert('Signup successful! Please log in.');
    navigate('/login');
  };

  return (

    <form className="auth-form" onSubmit={onSubmit}>
      <h2>Create account</h2>
      <input name="name" placeholder="Name" value={form.name} onChange={onChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={onChange} required />
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={onChange} required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
