import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'friendlyfare2024') {
      localStorage.setItem('ff_admin_auth', 'true');
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="card-glass rounded-2xl p-8 w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl text-primary text-glow-red tracking-wider">FRIENDLY FARE</h1>
          <p className="text-xs text-gold tracking-[0.3em]">ADMIN PANEL</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <input
            type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-display text-lg tracking-wider btn-glow">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
