import { useContext, useState } from "react";
import "./Login.css";
import { AuthContext } from "../contextapi/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;
    await login(email, password);
    setIsLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-image">
        <img src="https://i.postimg.cc/gc6k4YvS/Auth-Image-CVMA1y-Ft.png" />
      </div>
      <div className="auth-form">
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
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
          <button type="submit" className="btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
