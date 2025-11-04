import React, { useState, useContext } from 'react';
import { postJSON } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({ identifier:'', password:''});
  const { login } = useContext(AuthContext);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    const { ok, data } = await postJSON('/api/auth/login', form);
    if (ok) {
      login(data.user, data.token);
      nav('/dashboard');
    } else {
      alert(data?.message || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="username or email" value={form.identifier} onChange={e=>setForm({...form,identifier:e.target.value})}/>
      <input placeholder="password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
      <button>Login</button>
    </form>
  );
}
