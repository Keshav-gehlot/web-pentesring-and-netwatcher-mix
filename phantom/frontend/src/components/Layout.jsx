import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAuthData } from '../api';

function Layout({ username, role, onLogout }) {
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthData();
    onLogout();
    navigate('/login');
  };

  return (
    <>
      <header className="header-bar">
        <div className="logo-section">
          <button 
            onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
            style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', cursor: 'pointer', fontSize: '20px', marginRight: '10px' }}
          >
            ☰
          </button>
          <div>
            <h1 className="logo-text">PHANTOM</h1>
            <p className="logo-sub">Security Console v3.0</p>
          </div>
        </div>
        
        <div style={{ flex: 1 }}></div>
        
        <div className="user-profile">
          <button 
            type="button" 
            className="scan-btn" 
            style={{ background: 'rgba(255, 165, 0, 0.1)', color: 'var(--neon-orange)', border: '1px solid var(--neon-orange)', marginRight: '15px', boxShadow: '0 0 10px rgba(255, 165, 0, 0.2)' }} 
            onClick={() => setShowLegalModal(true)}
          >
            LEGAL & SAFE TARGETS
          </button>
          <span className="user-role">{username} // {role}</span>
          <button type="button" className="logout-btn" onClick={handleLogout}>DISCONNECT</button>
        </div>
      </header>

      {showLegalModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ maxWidth: '600px', width: '90%', maxHeight: '80vh', overflowY: 'auto', position: 'relative' }}>
            <button 
              onClick={() => setShowLegalModal(false)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: 'var(--neon-red)', cursor: 'pointer', fontFamily: 'var(--font-mono)' }}
            >[X] CLOSE</button>
            <h2 style={{ color: 'var(--neon-orange)', borderBottom: '1px solid rgba(255,165,0,0.3)', paddingBottom: '10px' }}>⚠️ LEGAL DISCLAIMER & SAFE TARGETS</h2>
            
            <div style={{ marginTop: '20px', lineHeight: '1.6', fontSize: '14px' }}>
              <h3 style={{ color: 'var(--neon-cyan)', marginBottom: '8px' }}>Responsible Disclosure</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Phantom is an automated offensive security suite. It is designed <strong>strictly</strong> for educational purposes, authorized security auditing, and testing systems you own.
              </p>
              <p style={{ color: 'var(--text-muted)' }}>
                You are solely responsible for ensuring you have explicit, written permission before initiating any scans. The authors of Phantom are not liable for any misuse, damage, or illegal activities conducted with this software.
              </p>

              <h3 style={{ color: 'var(--neon-cyan)', marginTop: '20px', marginBottom: '8px' }}>Safe Practice Targets</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '10px' }}>
                If you are testing the platform, please use the following community-provided targets explicitly designated for vulnerability scanning:
              </p>
              <ul style={{ color: 'var(--text-main)', fontFamily: 'var(--font-mono)', fontSize: '13px', background: 'rgba(0,0,0,0.4)', padding: '15px 30px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <li>scanme.nmap.org (Nmap testing)</li>
                <li>testphp.vulnweb.com (Acunetix testing)</li>
                <li>juice-shop.herokuapp.com (OWASP testing)</li>
                <li>xss-game.appspot.com (Google XSS testing)</li>
                <li>example.com (Safe generic endpoint)</li>
              </ul>
            </div>
            
            <div style={{ marginTop: '30px', textAlign: 'right' }}>
              <button 
                onClick={() => setShowLegalModal(false)}
                style={{ background: 'var(--neon-orange)', color: '#000', border: 'none', padding: '8px 20px', cursor: 'pointer', fontFamily: 'var(--font-nav)', fontWeight: 'bold', borderRadius: '4px' }}
              >I UNDERSTAND</button>
            </div>
          </div>
        </div>
      )}

      <div className="app-container">
        <aside className="sidebar" style={{ width: isSidebarExpanded ? '220px' : '60px', transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
          <nav className="nav-menu">
            <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} end>
              <span style={{ fontSize: '18px' }}>⚡</span>
              {isSidebarExpanded && <span>Audits Dashboard</span>}
            </NavLink>
            <NavLink to="/netwatch" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '18px' }}>👁️</span>
              {isSidebarExpanded && <span>Net-Watch Monitor</span>}
            </NavLink>
            <NavLink to="/history" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '18px' }}>📂</span>
              {isSidebarExpanded && <span>Scan Archives</span>}
            </NavLink>
            <NavLink to="/schedule" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
              <span style={{ fontSize: '18px' }}>⏱️</span>
              {isSidebarExpanded && <span>Audit Scheduler</span>}
            </NavLink>
          </nav>
          
          <div className="sidebar-footer" style={{ textAlign: isSidebarExpanded ? 'left' : 'center' }}>
            {isSidebarExpanded ? 'SYSTEM STABLE // SECURE' : '🟢'}
          </div>
        </aside>

        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
