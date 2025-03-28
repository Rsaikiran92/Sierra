import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../contextapi/AuthContext";

function Signup() {
  const { signup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    try {
      await signup(name, email, password);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img
          src="https://i.postimg.cc/pTCyHkL0/Auth-Image-CVMA1y-Ft.png"
          alt="Auth Illustration"
        />
      </div>
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>Signup</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" placeholder="Enter your name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter your email" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <button type="submit" className="btn" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
