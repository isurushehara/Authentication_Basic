import React, { useState, useContext } from 'react';
import { postJSON } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/auth.css';

export default function Signup(){
  const [form, setForm] = useState({ username:'', email:'', password:''});
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const { ok, data } = await postJSON('/api/auth/register', form);
    if (ok) {
      login(data.user, data.token);
      nav('/dashboard');
    } else {
      alert(data?.message || 'Signup failed');
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={submit}>
        <h2>Sign up</h2>
        <input placeholder="username" value={form.username} onChange={e=>setForm({...form,username:e.target.value})}/>
        <input placeholder="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
        <input placeholder="password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
        <button type="submit">Sign up</button>
        <div className="auth-nav">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}
