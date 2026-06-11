import React, { useState } from 'react';
import { API_BASE, setAuthData } from '../api';
import { useNavigate } from 'react-router-dom';

function Login({ onLoginSuccess }) {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: loginUsername, password: loginPassword })
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || 'Failed to authenticate');
      }
      const data = await res.json();
      setAuthData(data.access_token, data.username, data.role);
      onLoginSuccess(data.access_token, data.username, data.role);
      navigate('/');
    } catch (err) {
      setLoginError(err.message);
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleLoginSubmit}>
        <div className="login-title-section">
          <h1 className="login-logo">PHANTOM</h1>
          <p className="login-subtitle">SecOps Audit & Sniff Engine</p>
        </div>
        <div className="form-group">
          <label className="form-label">Username</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="e.g. admin" 
            value={loginUsername}
            onChange={e => setLoginUsername(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-input" 
            placeholder="••••••••" 
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            required 
          />
        </div>
        {loginError && <div className="login-error">{loginError}</div>}
        <button type="submit" className="login-btn">Initialize Connection</button>
        
        <div className="oauth-divider"><span>OR</span></div>
        <div className="oauth-buttons">
          <a href={`${API_BASE}/auth/google/login`} className="oauth-btn google-btn">
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google" />
            <span>Login with Google</span>
          </a>
          <a href={`${API_BASE}/auth/github/login`} className="oauth-btn github-btn">
            <img src="https://img.icons8.com/fluency/24/000000/github.png" alt="GitHub" />
            <span>Login with GitHub</span>
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
