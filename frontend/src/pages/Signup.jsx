import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // placeholder: perform signup
    navigate('/');
  }

  return (
    <div style={{ padding: 32, minHeight: '60vh' }}>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: 520, marginTop: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <label>Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6 }} />
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required style={{ width: '100%', padding: 10, marginTop: 6 }} />
        </div>
        <div>
          <button className="primary-btn">Create account</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
