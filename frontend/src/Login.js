import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const loginUser = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior

    try {
      const response = await fetch('http://20.219.81.67:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('profileName', username);
        onLogin();
      } else {
        console.log('Login failed');
      }
    } catch (error) { 
      console.error('Error:', error);
      setLoginError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="container-fluid login-background">
      <div className="row h-100">
        <div className="col-md-4 col-sm-10 align-self-center">
          <div className="login-modal">
            <div className="logo">
              <img src="/logo.png" alt="Logo" />
            </div>
            <br />
            <div className="message-area">
              {loginError && <div className="error-message">{loginError}</div>}
            </div>
            <form onSubmit={loginUser}>
              <div className="form-group">
                <i className="fas fa-envelope"></i>
                <input type="text" className="form-control input-field" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
              </div>
              <div className="form-group">
                <i className="fas fa-lock"></i>
                <input type="password" className="form-control input-field" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
