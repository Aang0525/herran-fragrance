import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try { await login(email, password); navigate("/admin"); }
    catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img src="/logo.png" alt="Herran Fragrance" style={{ height: 60, margin: "0 auto" }} />
        </div>
        <h2 style={{ textAlign: "center", marginTop: 0 }}>Panel de administración</h2>
        <form onSubmit={submit}>
          <div className="form-field">
            <label>Correo</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-field">
            <label>Contraseña</label>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <p style={{ color: "#7a2b2b", fontSize: 14 }}>{error}</p>}
          <button className="btn-gold" style={{ width: "100%" }} disabled={loading}>{loading ? "Entrando…" : "Entrar"}</button>
        </form>
      </div>
    </div>
  );
}
